@echo off
REM Create .env for backend1
echo Creating .env for backend1...
(
echo JWT_SECRET=livingthingstask
echo DJANGO_URL=http://localhost:8000/api
) > backend1\.env

REM Create .env for frontend
echo Creating .env for frontend...
(
echo REACT_APP_API_URL=http://localhost:3001
) > frontend\.env

REM Create .env for taskmanager_backend
echo Creating .env for taskmanager_backend...
(
echo CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
echo ALLOWED_HOSTS=127.0.0.1,localhost
echo SECRET_KEY=livingthingstask
) > taskmanager_backend\.env

echo All .env files created successfully.
pause
