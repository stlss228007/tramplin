Tramplin - Карьерная платформа для IT-специалистов
Tramplin — это платформа, объединяющая соискателей, работодателей и кураторов для эффективного поиска стажировок, вакансий и менторских программ в IT-сфере. Проект включает в себя backend на Go и frontend на React.

📋 Содержание
Архитектура

Технологический стек

Функциональные возможности

Запуск проекта

Backend (Go)

Frontend (React)

API Endpoints

Структура проекта

Переменные окружения

Тестовые данные

🏗 Архитектура
Проект состоит из двух независимых частей:

Backend — REST API на Go, работающий с PostgreSQL и Redis

Frontend — SPA на React с использованием Yandex Maps API

🛠 Технологический стек
Backend
Технология	Назначение
Go	Язык программирования
Gin	Web-фреймворк
GORM	ORM для работы с БД
PostgreSQL	Основная база данных
Redis	Кэш и хранение сессий
JWT	Аутентификация
Docker	Контейнеризация
Frontend
Технология	Назначение
React 18	UI библиотека
Vite	Сборка проекта
React Router	Маршрутизация
Yandex Maps API	Картографический сервис
Tailwind CSS	Стилизация
Radix UI	Компоненты интерфейса
✨ Функциональные возможности
Для всех пользователей
🔐 Регистрация и аутентификация (JWT + refresh token)

🗺 Интерактивная карта с вакансиями

🔍 Поиск и фильтрация возможностей

📍 Геолокация

Для соискателей (Applicant)
👤 Управление профилем (ФИО, вуз, навыки, GitHub)

🔒 Настройки приватности (публичный/только контакты/только я)

💼 Отклики на вакансии

⭐ Избранное

🤝 Профессиональные контакты

📅 Карьерный трекер (мероприятия, собеседования)

📄 Загрузка резюме

Для работодателей (Employer)
🏢 Управление профилем компании

📝 Создание и редактирование вакансий/стажировок

👥 Просмотр откликов

✅ Управление статусами откликов

Для кураторов (Curator)
🛡 Модерация возможностей

✅ Верификация компаний

👥 Управление пользователями

👨‍💼 Создание кураторов (для суперадминов)

🚀 Запуск проекта
Backend (Go)
Требования
Docker и Docker Compose

Go 1.21+ (для локальной разработки)

Запуск через Docker
bash
# Клонируем репозиторий
git clone <repository-url>
cd Tramplin

# Создаем файл .env на основе примера
cp .env.example .env

# Запускаем контейнеры
docker-compose up -d
Локальный запуск (без Docker)
bash
# Устанавливаем зависимости
go mod download

# Запускаем миграции (требуется PostgreSQL и Redis)
go run cmd/migrate/main.go

# Запускаем сервер
go run cmd/server/main.go
Сервер запустится на http://localhost:8080

Frontend (React)
Требования
Node.js 18+

npm или yarn

Установка и запуск
bash
# Переходим в папку с фронтендом
cd Frontend

# Устанавливаем зависимости
npm install

# Создаем файл .env на основе примера
cp .env.example .env
# Не забудьте добавить VITE_YANDEX_MAP_API_KEY=ваш_ключ

# Запускаем в режиме разработки
npm run dev
Приложение будет доступно по адресу http://localhost:5173

Сборка для продакшена
bash
npm run build
npm run preview
📡 API Endpoints
Метод	Endpoint	Описание
POST	/auth/register	Регистрация
POST	/auth/login	Вход
POST	/auth/refresh	Обновление токена
POST	/auth/logout	Выход
GET	/applicants/me	Профиль соискателя
PUT	/applicants/me	Обновление профиля
GET	/opportunities	Список возможностей
POST	/opportunities	Создание возможности
GET	/opportunities/:id	Детали возможности
PUT	/opportunities/:id	Обновление возможности
DELETE	/opportunities/:id	Удаление возможности
POST	/applications	Создание отклика
GET	/applications	Список откликов
PUT	/applications/:id/status	Обновление статуса отклика
GET	/favorites	Избранное
POST	/favorites	Добавить в избранное
DELETE	/favorites/:id	Удалить из избранного
GET	/contacts	Список контактов
POST	/contacts	Запрос в контакты
PUT	/contacts/:id/status	Принять/отклонить запрос
POST	/recommendations	Создать рекомендацию
GET	/recommendations	Получить рекомендации
🔧 Переменные окружения
Backend (.env)
env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=tramplin

REDIS_HOST=localhost
REDIS_PORT=6379

JWT_SECRET=your-secret-key
JWT_ACCESS_EXPIRES=900        # 15 минут
JWT_REFRESH_EXPIRES=604800    # 7 дней
Frontend (.env)
env
VITE_API_URL=http://localhost:8080
VITE_YANDEX_MAP_API_KEY=your-yandex-maps-api-key
🧪 Тестовые данные
Для тестирования доступны следующие учетные записи:

Роль	Email	Пароль
Соискатель	applicant@demo.com	123456
Работодатель	employer@demo.com	123456
Куратор	admin@demo.com	123456
Суперадмин	superadmin@demo.com	123456
📝 Лицензия
MIT