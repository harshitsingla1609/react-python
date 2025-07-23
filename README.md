# Full Stack React + Django REST Framework App

## Backend (Django/DRF)

1. **Setup virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   cd backend
   pip install -r requirements.txt
   ```
2. **Apply migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
3. **Create superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```
4. **Run the server:**
   ```bash
   python manage.py runserver
   ```

APIs are available at `/api/auth/` (register, login, logout, refresh, user profile).

---

## Frontend (React)

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```
2. **Run the app:**
   ```bash
   npm start
   ```

---

## Features

- JWT authentication (login, refresh, logout)
- Password hashing (Django default)
- User registration & profile
- CORS enabled for frontend-backend communication

---

## Folder Structure

- `backend/` - Django REST API
- `frontend/` - React app

---

## Notes

- Update CORS settings in `backend/settings.py` for production.
- Use `.env` files for secrets and environment variables.
