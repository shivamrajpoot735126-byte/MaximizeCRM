# MaximizeCRM — RetailMax CRM

Full-stack starter CRM using React + Vite, Django REST Framework, MySQL and JWT authentication.

## Project structure
- `Backend/` Django REST API and admin
- `Frontend/` React dashboard

## 1. MySQL setup
Create the database in MySQL Workbench:
```sql
CREATE DATABASE maximizecrm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 2. Backend setup (Windows PowerShell)
```powershell
cd Backend
py -3.13 -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
```
Open `Backend/.env` and set your own MySQL root password and a strong SECRET_KEY. Do not share `.env`.

Then:
```powershell
python manage.py makemigrations accounts contacts leads sales marketing support analytics integrations workflows documents activities
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
Backend: http://127.0.0.1:8000  
Admin: http://127.0.0.1:8000/admin/  
API docs: http://127.0.0.1:8000/api/docs/

## 3. Frontend setup (new terminal)
```powershell
cd Frontend
npm install
Copy-Item .env.example .env
npm run dev
```
Frontend: http://localhost:5173

## 4. Login
Use the Django superuser username and password in the frontend login screen.
The frontend obtains a JWT access/refresh token from `/api/token/`.

## Included API modules
- `/api/contacts/`
- `/api/leads/`
- `/api/pipelines/`
- `/api/opportunities/`
- `/api/campaigns/`
- `/api/tickets/`
- `/api/reports/`
- `/api/integrations/`
- `/api/workflows/`
- `/api/documents/`
- `/api/tasks/`
- `/api/events/`

All resource APIs require JWT authentication. Registration endpoint: `/api/auth/register/`.

## Important
This is a runnable CRM foundation with working authentication, data models, CRUD APIs and a React admin-style dashboard. Business-specific automation rules, email/SMS providers, granular role permissions, audit trails, advanced analytics, production deployment, and comprehensive tests still need to be configured for your organization before production use.
