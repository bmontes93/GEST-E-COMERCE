# GEST E-COMMERCE

Plataforma moderna de comercio electrónico y gestión, construida con una arquitectura de microservicios utilizando React (Vite) para el frontend y Python (FastAPI/Django) para el backend, todo contenedorizado con Docker.

## 🚀 Características Principales

- **Frontend Moderno/Reactivo**: Construido con React y Vite para una experiencia de usuario rápida y fluida.
- **Backend Robusto**: API potente basada en Python.
- **Contenedorización**: Despliegue simplificado y consistente mediante Docker y Docker Compose.
- **Base de Datos Persistente**: Configuración lista para persistencia de datos.

## 🛠️ Stack Tecnológico

- **Frontend**: React, Vite, TailwindCSS (inferido por configuración).
- **Backend**: Python (Django/FastAPI), SQL database.
- **Infraestructura**: Docker, Docker Compose.

## 📋 Requisitos Previos

Asegúrate de tener instalados:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## ⚡ Instalación y Despliegue

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/bmontes93/GEST-E-COMERCE.git
   cd GEST-E-COMERCE
   ```

2. **Iniciar la aplicación con Docker Compose:**

   ```bash
   docker-compose up --build
   ```

   Esto construirá las imágenes del frontend y backend e iniciará los contenedores.

3. **Acceder a la aplicación:**

   - **Frontend**: [http://localhost:5173](http://localhost:5173) (o el puerto configurado en mapeo 80).
   - **Backend API**: [http://localhost:8000](http://localhost:8000)

## 📂 Estructura del Proyecto

```
GEST-E-COMERCE/
├── backend/            # Código fuente del servidor (Python)
├── frontend/           # Código fuente del cliente (React/Vite)
├── docker-compose.yml  # Orquestación de servicios Docker
├── README.md           # Documentación del proyecto
└── .gitignore          # Configuración de exclusión de Git
```

## 🤝 Contribuir

1. Haz un Fork del proyecto.
2. Crea tu rama de funcionalidad (`git checkout -b feature/AmazingFeature`).
3. Haz Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`).
4. Haz Push a la rama (`git push origin feature/AmazingFeature`).
5. Abre un Pull Request.

---
Desarrollado con ❤️ por el equipo de GEST.
