# 🧠 Task Manager Fullstack App

This project is a full-stack task manager application with:

- 🖥️ **React frontend**
- 🐍 **Django backend**
- 🌐 **Node.js backend (for auth)**

It supports user authentication, task CRUD operations, and API communication across services.

## 🌐 Live Demo

The React frontend is deployed and accessible at:
**[https://living-things-task-list.netlify.app](https://living-things-task-list.netlify.app)**

---

## 🧩 Project Structure

```
root/
│
├── backend1/             # Node.js backend (auth)
├── frontend/             # React frontend
├── taskmanager_backend/  # Django backend
├── create_env.bat        # Batch file to set up environment variables
└── run.bat               # Batch file to run all services
```

---

## ⚙️ Setup Instructions

### 🪟 For Windows Users

You can run the whole app using two batch files provided in the root directory:

### 1. Setup Environment Variables

Double-click or run this in terminal:

```cmd
create_env.bat
```

This creates `.env` files for:

- `backend1/.env`
- `frontend/.env`
- `taskmanager_backend/.env`

Environment variable values:

```
# backend1/.env
JWT_SECRET=livingthingstask
DJANGO_URL=http://localhost:8000/api

# frontend/.env
REACT_APP_API_URL=http://localhost:3001

# taskmanager_backend/.env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
ALLOWED_HOSTS=127.0.0.1,localhost
```

### 2. Run All Servers

Now run:

```cmd
run.bat
```

This will:

- Install Node.js and Python dependencies
- Start each server (Node.js, Django, React)

### 🐧 For Linux/Mac Users

`.bat` files are Windows-specific. For Linux/Mac, follow the steps manually:

#### 1. Create `.env` Files

Run these commands in the project root:

```bash
# backend1/.env
echo -e "JWT_SECRET=livingthingstask\nDJANGO_URL=http://localhost:8000/api" > backend1/.env

# frontend/.env
echo -e "REACT_APP_API_URL=http://localhost:3001" > frontend/.env

# taskmanager_backend/.env
echo -e "CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001" > taskmanager_backend/.env
```

#### 2. Start All Servers

React Frontend:

```bash
cd frontend
npm install
npm start
```

Node.js Backend:

```bash
cd backend1
npm install
node index.js
```

Django Backend:

```bash
cd taskmanager_backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

## 🚨 Troubleshooting

- **Ports in Use**: Make sure 3000, 3001, and 8000 are free.
- **.env not loaded?** Rerun `create_env.bat` or check manual file creation.
- **Database issues?** Ensure migrations ran and `db.sqlite3` is writable.

## ✅ Summary

| Step                 | Windows          | Linux / Mac           |
| -------------------- | ---------------- | --------------------- |
| Set environment vars | `create_env.bat` | Use shell commands    |
| Start all servers    | `run.bat`        | Run commands manually |

All done! 🎉 Your task manager is up and running locally.

## 📱 Accessing the Application

- **Local Access**:

  - Frontend: http://localhost:3000
  - Node.js API: http://localhost:3001
  - Django API: http://localhost:8000/api

- **Deployed Version**:
  Access the deployed React application at **[https://living-things-task-list.netlify.app](https://living-things-task-list.netlify.app)**

  Note: The deployed version connects to backend services that are hosted separately.
