<a name="readme-top"></a>

<div align="center">
  <!-- Logo (Placeholder if not available, using emoji/text for now) -->
  <h1>🛍️ GEST E-COMMERCE</h1>

  <p align="center">
    <h3>Plataforma Integral de Gestión y Comercio Electrónico</h3>
    <p>
      Una solución robusta, escalable y moderna construida con arquitectura de microservicios.
      <br />
      <a href="#-demo"><strong>Ver Demo »</strong></a>
      <br />
      <br />
      <a href="#-reporte-de-bugs">Reportar Bug</a>
      ·
      <a href="#-solicitar-feature">Solicitar Feature</a>
    </p>
  </p>
</div>

<!-- Badges -->
<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg?style=for-the-badge)]()
[![GitHub Issues](https://img.shields.io/github/issues/bmontes93/GEST-E-COMERCE.svg?style=for-the-badge)](https://github.com/bmontes93/GEST-E-COMERCE/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/bmontes93/GEST-E-COMERCE.svg?style=for-the-badge)](https://github.com/bmontes93/GEST-E-COMERCE/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)

</div>

<br />

<!-- Table of Contents -->
<details>
  <summary><strong> Tabla de Contenidos</strong></summary>
  <ol>
    <li>
      <a href="#-sobre-el-proyecto">Sobre el Proyecto</a>
      <ul>
        <li><a href="#%EF%B8%8F-stack-tecnológico">Stack Tecnológico</a></li>
        <li><a href="#-arquitectura">Arquitectura</a></li>
      </ul>
    </li>
    <li>
      <a href="#-comenzando">Comenzando</a>
      <ul>
        <li><a href="#requisitos-previos">Requisitos Previos</a></li>
        <li><a href="#instalación">Instalación</a></li>
        <li><a href="#variables-de-entorno">Variables de Entorno</a></li>
      </ul>
    </li>
    <li><a href="#-uso">Uso</a></li>
    <li><a href="#-roadmap">Roadmap</a></li>
    <li><a href="#-contribuyendo">Contribuyendo</a></li>
    <li><a href="#-contacto">Contacto</a></li>
  </ol>
</details>

---

##  Sobre el Proyecto

**GEST E-COMMERCE** nace con el objetivo de proporcionar una infraestructura sólida para negocios digitales. A diferencia de las soluciones monolíticas tradicionales, GEST apuesta por una separación clara de responsabilidades, garantizando mantenibilidad y escalabilidad.

###  Características Clave

*   ** E-commerce Fullstack**: Catálogo, carrito de compras y pasarela de pago (simulada/integrada).
*   ** Dashboard Administrativo**: Gestión de productos, usuarios y métricas en tiempo real.
*   ** Autenticación Segura**: Sistema robusto de gestión de usuarios y roles.
*   ** Rendimiento Optimizado**: Frontend compilado con Vite para cargas instantáneas.
*   ** Docker Native**: Entorno de desarrollo idéntico a producción.

###  Stack Tecnológico

| Componente | Tecnología | Descripción |
| :--- | :--- | :--- |
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) | Biblioteca de UI principal. |
| **Styling** | ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | Framework de utilidades CSS. |
| **Build Tool** | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) | Empaquetador extremadamente rápido. |
| **Backend** | ![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white) | Lógica de negocio y API. |
| **Database** | ![SQLite](https://img.shields.io/badge/SQLite-07405E?style=flat&logo=sqlite&logoColor=white) | Base de datos ligera (Dev). |
| **DevOps** | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white) | Orquestación de contenedores. |

###  Arquitectura

El proyecto sigue una arquitectura de cliente-servidor desacoplada:

```mermaid
graph LR
    A[Cliente (React/Vite)] -- HTTP/JSON --> B[Servidor (Python API)]
    B -- SQL --> C[(Base de Datos)]
```

---

##  Comenzando

Sigue estos pasos para levantar una copia local del proyecto.

### Requisitos Previos

*   **Docker Desktop**: [Descargar e instalar](https://www.docker.com/products/docker-desktop)
*   **Git**: [Descargar e instalar](https://git-scm.com/)

### Instalación

1.  **Clonar el repositorio**
    ```sh
    git clone https://github.com/bmontes93/GEST-E-COMERCE.git
    cd GEST-E-COMERCE
    ```

2.  **Configurar entorno (Opcional)**
    Crea un archivo `.env` en la raíz si es necesario (ver sección Variables de Entorno).

3.  **Desplegar con Docker Compose**
    ```sh
    docker-compose up --build
    ```

4.  **Verificar estado**
    *   Frontend accesible en: `http://localhost:5173`
    *   Backend API accesible en: `http://localhost:8000`

### Variables de Entorno

Aunque el proyecto funciona "out-of-the-box" para desarrollo, puedes configurar las siguientes variables:

`backend/.env` (Ejemplo)
```env
DEBUG=True
SECRET_KEY=tu_clave_secreta_super_segura
DATABASE_URL=sqlite:///database.db
```

---

##  Roadmap

- [x] Configuración inicial del proyecto y Dockerización.
- [x] Estructura base Frontend y Backend.
- [ ] Implementación de Autenticación (JWT).
- [ ] Pasarela de Pagos (Stripe/PayPal).
- [ ] Dashboard de Analíticas Avanzado.
- [ ] Soporte Multi-idioma (i18n).

Consulta los [issues abiertos](https://github.com/bmontes93/GEST-E-COMERCE/issues) para ver la lista completa de características propuestas.

---

##  Contribuyendo

Las contribuciones son lo que hacen a la comunidad de código abierto un lugar increíble para aprender, inspirar y crear. Cualquier contribución que hagas es **muy apreciada**.

1.  Haz un Fork del proyecto.
2.  Crea tu rama de funcionalidad (`git checkout -b feature/AmazingFeature`).
3.  Haz Commit de tus cambios (`git commit -m 'feat: Add some AmazingFeature'`).
4.  Haz Push a la rama (`git push origin feature/AmazingFeature`).
5.  Abre un Pull Request.

---

##  Autor

**Desarrollado por [bmontes93](https://github.com/bmontes93)**

*   Link del Proyecto: [https://github.com/bmontes93/GEST-E-COMERCE](https://github.com/bmontes93/GEST-E-COMERCE)

---
<div align="center">
  <p>Si este proyecto te ayudó, ¡considera darle una ⭐️!</p>
</div>
