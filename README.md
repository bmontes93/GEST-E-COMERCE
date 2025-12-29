<div align="center">

# GEST E-COMMERCE

### Plataforma moderna de comercio electrónico y gestión

[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Python](https://img.shields.io/badge/Backend-Python_3.10+-3776AB?style=for-the-badge&logo=python)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/Deploy-Docker-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br />

_Plataforma Fullstack de alto rendimiento diseñada para la gestión integral de comercio electrónico._

[Características](#-características-principales) •
[Instalación](#-instalación-y-despliegue) •
[Uso](#-acceder-a-la-aplicación) •
[Stack](#-stack-tecnológico) •
[Contribuir](#-contribuir)

</div>

---

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

<div align="center">
    Desarrollado con ❤️ por el equipo de GEST.
</div>
