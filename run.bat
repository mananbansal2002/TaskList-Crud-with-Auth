@echo off
echo Starting Node.js backend...
cd backend1
call npm install
start cmd /k "node index.js"

echo Starting React frontend...
cd ..\frontend
call npm install
start cmd /k "npm start"

echo Starting Django backend...
cd ..\taskmanager_backend
call pip install -r requirements.txt
call python manage.py makemigrations
call python manage.py migrate
start cmd /k "python manage.py runserver"

echo All servers started.
pause
