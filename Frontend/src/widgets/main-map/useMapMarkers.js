// src/widgets/main-map/useMapMarkers.js
import { useRef, useEffect } from 'react';
import { createMarkerIcon } from './createMarkerIcon';
import { useFavorites } from '@/features/favorites';
import { getOpportunityTypeName } from '@/shared/lib/opportunityHelpers';

export const useMapMarkers = (
  map,
  opportunities,
  onMarkerClick,
  isMobile,
  selectedMarkerId,
  setSelectedMarkerId
) => {
  const { isFavorite } = useFavorites();
  const markersRef = useRef([]);
  const currentMarkerRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    // Удаляем старые метки
    markersRef.current.forEach((marker) => {
      if (marker) map.geoObjects.remove(marker);
    });
    markersRef.current = [];

    if (!opportunities.length) return;

    // Подсчёт количества вакансий в одной точке
    const locationCount = {};
    opportunities.forEach((opp) => {
      if (!opp.Latitude || !opp.Longitude) return;
      const key = `${opp.Latitude},${opp.Longitude}`;
      locationCount[key] = (locationCount[key] || 0) + 1;
    });

    let indexAtLocation = {};

    opportunities.forEach((opp) => {
      if (!opp.Latitude || !opp.Longitude) return;

      const key = `${opp.Latitude},${opp.Longitude}`;
      const countAtLocation = locationCount[key];
      const currentIndex = indexAtLocation[key] || 0;
      indexAtLocation[key] = currentIndex + 1;

      // Смещение для дублирующихся меток
      let [lat, lng] = [opp.Latitude, opp.Longitude];
      if (countAtLocation > 1) {
        const offset = (currentIndex - (countAtLocation - 1) / 2) * 0.002;
        lat = opp.Latitude + offset;
        lng = opp.Longitude + offset * 0.8;
      }

      // Проверяем, находится ли возможность в избранном
      const isFav = isFavorite(opp.ID);
      
      // Форматирование зарплаты
      const salaryText = opp.SalaryMin && opp.SalaryMax
        ? `${opp.SalaryMin.toLocaleString()} – ${opp.SalaryMax.toLocaleString()} ₽`
        : opp.SalaryMin
        ? `от ${opp.SalaryMin.toLocaleString()} ₽`
        : opp.SalaryMax
        ? `до ${opp.SalaryMax.toLocaleString()} ₽`
        : 'з/п не указана';

      // Навыки
      const skillsHtml = opp.Tags?.slice(0, 3)
        .map((tag) => `<span class="balloon-skill">${tag.name}</span>`)
        .join('') || '';

      // Добавляем индикатор избранного в балун
      const favoriteIcon = isFav ? '<span style="color: #ff4444; margin-left: 8px;">★</span>' : '';

      // Шаблон балуна
      const balloonLayout = map.templateLayoutFactory.createClass(
        `<div class="custom-balloon">
          <div class="balloon-title">{{ properties.title }}${favoriteIcon}</div>
          <div class="balloon-company">{{ properties.company }}</div>
          <div class="balloon-skills">${skillsHtml}</div>
          <div class="balloon-salary">{{ properties.salary }}</div>
          <button class="balloon-button" data-id="{{ properties.id }}">Подробнее</button>
        </div>`,
        {
          build: function () {
            this.constructor.superclass.build.call(this);
            const button = this.getElement().querySelector('.balloon-button');
            if (button) {
              button.addEventListener('click', (e) => {
                e.stopPropagation();
                const buttonId = String(button.getAttribute('data-id'));
                
                const opportunity = opportunities.find((o) => String(o.ID) === String(buttonId));
                
                if (opportunity) {
                  setSelectedMarkerId(buttonId);
                  onMarkerClick(opportunity);
                } else {
                  console.error('Вакансия с таким ID не найдена');
                }
              });
            }

            const balloonElement = this.getElement();
            if (balloonElement) {
              balloonElement.addEventListener('mouseenter', () => {
                if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
              });
              balloonElement.addEventListener('mouseleave', () => {
                if (!isMobile && currentMarkerRef.current) {
                  closeTimeoutRef.current = setTimeout(() => {
                    currentMarkerRef.current.balloon.close();
                    currentMarkerRef.current = null;
                  }, 100);
                }
              });
            }
          },
        }
      );

      const isSelected = opp.ID === selectedMarkerId;

      const marker = new window.ymaps.Placemark(
        [lat, lng],
        {
          title: opp.Title,
          company: opp.Employer?.companyName || 'Компания',
          salary: salaryText,
          id: opp.ID,
        },
        {
          ...createMarkerIcon(getOpportunityTypeName(opp.OpportunityType), isFav, isSelected),
          balloonLayout: balloonLayout,
          balloonPanelMaxMapArea: 0,
          balloonAutoPan: false,
          balloonCloseButton: false,
          balloonShadow: false,
          hideIconOnBalloonOpen: false,
          openBalloonOnClick: false,
        }
      );

      // Мобильные события
      if (isMobile) {
        let clickCount = 0;
        let clickTimer = null;

        marker.events.add('click', () => {
          if (clickTimer) clearTimeout(clickTimer);
          clickCount++;

          if (clickCount === 1) {
            if (currentMarkerRef.current === marker) {
              marker.balloon.close();
              currentMarkerRef.current = null;
              clickCount = 0;
            } else {
              if (currentMarkerRef.current) {
                currentMarkerRef.current.balloon.close();
              }
              marker.balloon.open();
              currentMarkerRef.current = marker;
            }
            clickTimer = setTimeout(() => {
              clickCount = 0;
            }, 300);
          } else if (clickCount === 2) {
            marker.balloon.close();
            currentMarkerRef.current = null;
            setSelectedMarkerId(opp.ID);
            onMarkerClick(opp);
            clickCount = 0;
            if (clickTimer) clearTimeout(clickTimer);
          }
        });
      } else {
        // Десктоп: hover и клик
        marker.events.add('mouseenter', () => {
          if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
          currentMarkerRef.current = marker;
          marker.balloon.open();
        });

        marker.events.add('mouseleave', () => {
          closeTimeoutRef.current = setTimeout(() => {
            if (currentMarkerRef.current === marker) {
              marker.balloon.close();
              currentMarkerRef.current = null;
            }
          }, 200);
        });

        marker.events.add('click', () => {
          setSelectedMarkerId(opp.ID);
          onMarkerClick(opp);
        });
      }

      map.geoObjects.add(marker);
      markersRef.current.push(marker);
    });

    // Очистка таймера при размонтировании эффекта
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [
    map,
    opportunities, // Теперь маркеры пересоздаются при изменении этого массива
    onMarkerClick,
    isMobile,
    selectedMarkerId,
    setSelectedMarkerId,
    isFavorite,
  ]);

  const closeAllBalloons = () => {
    markersRef.current.forEach((marker) => {
      marker.balloon.close();
    });
    currentMarkerRef.current = null;
  };

  return { markersRef, closeAllBalloons };
};