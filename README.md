# 🩸 GlucoFit

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white)
![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)
![Fly.io](https://img.shields.io/badge/API_on-Fly.io-8B5CF6?style=flat&logo=flydotio&logoColor=white)

Aplicación web full stack para el seguimiento de la glucemia, pensada para personas con diabetes que quieren llevar un registro de sus controles junto con contenido de apoyo sobre ejercicio y nutrición.

**🔗 Demo desplegada:**
- 🖥️ Frontend: [https://gluco-fit.netlify.app](https://gluco-fit.netlify.app)
- ⚙️ API: [https://glucofit-backend.fly.dev](https://glucofit-backend.fly.dev)

## ✨ Funcionalidades

- Registro e inicio de sesión de usuarios (autenticación por sesión, con cookies).
- Registro de controles de glucemia: valor, momento del día, fecha/hora, insulina (unidades y tipo) y notas.
- Listado de controles del usuario autenticado, con indicador visual por rango de glucosa (bajo / normal / alto / muy alto).
- Gráficos de evolución: media semanal y mensual, tanto de glucosa como de insulina.
- Sección de ejercicios (running, gimnasio, flexibilidad) organizados por categoría.
- Sección de recetas/nutrición (postres, carnes, ensaladas, vegano) organizadas por categoría.
- Rutas protegidas: solo un usuario autenticado puede acceder a sus datos.

## 🧰 Stack tecnológico

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- express-session + connect-mongo (autenticación por sesión)
- bcryptjs (hash de contraseñas)
- convict (validación de configuración/variables de entorno)
- pino / pino-http (logging)

**Frontend**
- React + Vite
- React Router (rutas protegidas con guards)
- React Hook Form (formularios y validación)
- Axios (cliente HTTP)
- Recharts (gráficos)
- Bootstrap (estilos)
- ParticlesJS (Background animado)

**Despliegue**
- API: Fly.io (Docker)
- Frontend: Netlify

## 📁 Estructura del proyecto

```
project-glucoFit/
├── api/
│   └── src/
│       ├── controllers/       # Lógica de cada recurso (users, glucose, exercises, recipes)
│       ├── lib/
│       │   ├── models/        # Schemas de Mongoose (User, Glucose, Exercise, Recipes)
│       │   ├── config.js      # Configuración validada con convict
│       │   ├── db.js          # Conexión a MongoDB
│       │   ├── session.js     # Configuración de express-session
│       │   └── cors.js
│       ├── middlewares/
│       │   └── auth.mid.js    # Middleware de autenticación por sesión
│       ├── data/              # Datos de recetas (seed)
│       ├── data-exercises/    # Datos de ejercicios (seed)
│       └── app.js
│
└── web/
    └── gluco-fit/
        └── src/
            ├── components/    # Componentes reutilizables (auth, glucose, exercises, recipes, ui)
            ├── context/       # AuthContext
            ├── guards/        # PrivateRoute
            ├── hooks/         # use-auth, use-glucose
            ├── pages/         # Páginas (home, login, register, glucose, exercises, recipes...)
            ├── services/      # Llamadas a la API (api-service, auth-service, glucose-service...)
            └── App.jsx
```

## 🚀 Instalación y desarrollo local

### Requisitos previos
- Node.js
- Una base de datos MongoDB (local o Atlas)

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd project-glucoFit
```

### 2. Backend (api/)

```bash
cd api
npm install
```

Crea un archivo `.env` en `api/` con estas variables:

```
PORT=3000
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/gluco-fit
SESSION_SECRET=un_secreto_largo_y_aleatorio
SESSION_SECURE=false
CORS_ENABLED=true
CORS_ORIGIN=http://localhost:5173
```

Arranca el servidor:

```bash
npm run dev
```

La API quedará disponible en `http://localhost:3000`.

### 3. Frontend (web/gluco-fit/)

```bash
cd web/gluco-fit
npm install
```

Crea un archivo `.env` en `web/gluco-fit/` con:

```
VITE_BASE_API_URL=http://localhost:3000/api/v0
```

Arranca el servidor de desarrollo:

```bash
npm run dev
```

El frontend quedará disponible en `http://localhost:5173`.

## 🔌 Principales endpoints de la API

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/v0/users` | Registro de usuario |
| POST | `/api/v0/sessions` | Login |
| DELETE | `/api/v0/sessions` | Logout |
| GET | `/api/v0/users/me` | Perfil del usuario autenticado |
| GET | `/api/v0/glucose` | Listar controles de glucosa del usuario |
| POST | `/api/v0/glucose` | Crear un control de glucosa |
| GET | `/api/v0/glucose/:id` | Detalle de un control |
| PATCH | `/api/v0/glucose/:id` | Editar un control |
| DELETE | `/api/v0/glucose/:id` | Eliminar un control |
| GET | `/api/v0/exercises` | Listar ejercicios |
| GET | `/api/v0/recipes` | Listar recetas |

## 👤 Autor

Proyecto desarrollado por Rubén Gómez Ibáñez, como proyecto del Módulo 3 del bootcamp Full Stack de IronHack.


