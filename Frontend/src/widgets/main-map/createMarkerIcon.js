// src/widgets/main-map/createMarkerIcon.js

const getMarkerColor = (type, isFavorite = false) => {
  const baseColors = {
    'Вакансия': '#ffd757',      // жёлтый
    'Стажировка': '#4a9eff',    // синий
    'Менторство': '#c45bff',    // фиолетовый
    'Мероприятие': '#ff8855',   // оранжевый (добавляем)
  };
  
  const favoriteColors = {
    'Вакансия': '#ffaa33',      // тёмно-жёлтый/золотой
    'Стажировка': '#33cc99',    // бирюзовый
    'Менторство': '#dd88ff',    // светло-фиолетовый
    'Мероприятие': '#ff9966',   // светло-оранжевый (добавляем)
  };
  
  if (isFavorite) {
    return favoriteColors[type] || '#ffaa33';
  }
  return baseColors[type] || '#ff8855';
};

export const createMarkerIcon = (type, isFavorite = false, isSelected = false) => {
  const color = getMarkerColor(type, isFavorite);
  const strokeColor = isSelected ? '#ffffff' : '#f0f0f0';
  const strokeWidth = isSelected ? 3 : 2;
  
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
      <defs>
        <filter id="shadow" x="-0.2" y="-0.2" width="1.4" height="1.4">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
          <feOffset dx="1" dy="1" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path d="M16,2 C8.3,2 2,8.3 2,16 C2,23.7 16,40 16,40 C16,40 30,23.7 30,16 C30,8.3 23.7,2 16,2Z" 
            fill="${color}" stroke="${strokeColor}" stroke-width="${strokeWidth}" filter="url(#shadow)"/>
      ${isFavorite ? '<circle cx="24" cy="8" r="4" fill="#ff4444" stroke="white" stroke-width="1.5"/>' : ''}
    </svg>
  `;
  
  return {
    iconLayout: 'default#image',
    iconImageHref: `data:image/svg+xml,${encodeURIComponent(svg)}`,
    iconImageSize: [32, 42],
    iconImageOffset: [-16, -42],
  };
};