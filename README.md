# Secure File Sharing App
File sharing app with user authentication and file encryption.

## Tech Stack
- Django REST Framework
- React
- Docker
- PostgreSQL

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/roshanrajeev/secure-file-sharing-app.git
cd secure-file-sharing-app
```

2. Create environment files:
```bash
# Backend
cp server/.env.example server/.env

# Frontend
cp client/.env.example client/.env
```

3. Update `server/.env` with these values:
```env
DEBUG=1
DJANGO_SECRET_KEY=<your-secret-key>
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1

DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432
```

4. Start the application:
```bash
docker compose up -d --build
```

5. In a new terminal, run migrations:
```bash
docker compose exec api python manage.py migrate
```

## Note

In development mode, use "123456" as the verification code for logging in.

## Access Points

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
