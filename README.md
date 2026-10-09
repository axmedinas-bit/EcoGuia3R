# EcoGuía3R 🌱♻️

> **Plataforma educativa interactiva sobre reciclaje, separación en la fuente y gestión comunitaria de residuos, con base de datos SQLite, pipeline de automatización en Python y despliegue automático en GitHub Pages.**

---

## 🌟 Características Principales

- **Clasificación por Colores (Resolución Colombiana 2184):**
  - ⚪ **Blanco:** Residuos aprovechables limpios y secos (plástico, vidrio, cartón, papel, metal).
  - 🟢 **Verde:** Residuos orgánicos aprovechables (restos de comida, cáscaras, podas).
  - ⚫ **Negro:** Residuos no aprovechables (papel higiénico, servilletas usadas, papeles metalizados).
- **Simulador Interactivo de Clasificación:** Juego pedagógico en tiempo real para practicar el depósito de residuos en sus respectivos contenedores.
- **Canal Comunitario de Sugerencias:** Formulario para que la comunidad registre ideas, inquietudes y puntos de reciclaje.
- **Panel de Administración Protegido:**
  - Edición y eliminación de sugerencias.
  - Exportación de la base de datos a **Excel (.xlsx/.csv)** y script **SQL (.sql)**.
  - Gestión de cuentas de administradores con contraseñas cifradas en SHA-256.
  - Visualización del esquema relacional SQLite.
- **Pipeline de Python (`build_pages.py`):**
  - Automatiza la creación, verificación y respaldo de la base de datos SQLite (`instance/app.db`).
  - Genera el dump SQL (`instance/ecoguia_database.sql`).
  - Compila los recursos web con rutas relativas (`base: './'`), archivo `.nojekyll` y fallback `404.html` para compatibilidad total con GitHub Pages.

---

## 🚀 Despliegue en GitHub Pages

Este repositorio incluye un flujo de trabajo de GitHub Actions en `.github/workflows/deploy.yml` completamente configurado.

### Pasos para Activar GitHub Pages en tu Repositorio:

1. Sube este repositorio a GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: EcoGuía3R compatible con GitHub Pages"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/EcoGuia3R.git
   git push -u origin main
   ```

2. En la página de tu repositorio en GitHub:
   - Ve a la pestaña **Settings** (Configuración).
   - En el menú lateral izquierdo, selecciona **Pages**.
   - En la sección **Build and deployment** -> **Source**, selecciona:
     👉 **GitHub Actions**
   
3. ¡Listo! Cada vez que hagas `git push` a `main` o `master`, GitHub Actions ejecutará automáticamente:
   - Configuración de Python 3.10 y Node.js 20.
   - `python build_pages.py` para sincronizar SQLite y compilar el proyecto.
   - Despliegue inmediato en tu URL:
     `https://TU-USUARIO.github.io/EcoGuia3R/`

---

## 💻 Ejecución y Compilación Local

### Requisitos Previos:
- **Python 3.10+**
- **Node.js 18+** / npm

### Compilar y Preparar para Producción con Python:
```bash
# 1. Instalar dependencias Python (opcional para Flask/SQLite)
pip install -r requirements.txt

# 2. Instalar dependencias web
npm install --legacy-peer-deps

# 3. Ejecutar el pipeline de construcción de Python
python build_pages.py
```
El comando generará la carpeta `dist/` lista para ser servida por cualquier servidor web o GitHub Pages.

### Modo Desarrollo:
```bash
npm run dev
```
Abre tu navegador en `http://localhost:3000`.

---

## 🔐 Credenciales del Panel de Administrador

Para acceder al apartado de administradores desde la web:
- **Usuario:** `admin`
- **Contraseña:** `admin123`

*(Puedes cambiar la contraseña o agregar nuevos administradores directamente desde el panel).*

---

## 📁 Estructura del Repositorio

```text
EcoGuia3R/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automatización de despliegue en GitHub Pages
├── app/                        # Módulo Flask y CLI de SQLite
│   ├── tables.py
│   └── routes.py
├── instance/
│   ├── app.db                  # Base de datos SQLite
│   └── ecoguia_database.sql    # Volcado SQL de respaldo
├── public/
│   ├── favicon.svg             # Favicon ecológico
│   ├── robots.txt              # Configuración de indexación
│   └── .nojekyll               # Evita que GitHub Pages omita archivos con guión bajo
├── src/                        # Código fuente de la interfaz React + Tailwind CSS
│   ├── components/             # Componentes modulares (Hero, Bins, Admin, etc.)
│   ├── db/
│   │   └── sqlite.ts           # Servicio cliente SQLite y gestión de sesiones
│   └── App.tsx
├── build_pages.py              # Script Python de build y verificación para GitHub Pages
├── index.html                  # Plantilla HTML con metadatos SEO y OpenGraph
├── vite.config.ts              # Configuración de empaquetado con rutas relativas (base: './')
└── package.json
```

---

## 📄 Licencia

Proyecto educativo de código abierto bajo la Licencia MIT.
