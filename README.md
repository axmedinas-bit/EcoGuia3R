# EcoGuía3R 🌱♻️

> **Plataforma educativa interactiva sobre reciclaje, separación en la fuente y gestión comunitaria de residuos, con backend y herramientas en Python, base de datos SQLite y despliegue automático en GitHub Pages.**

---

## 🐍 Ecosistema y Arquitectura en Python

EcoGuía3R integra un ecosistema robusto en **Python 3** para gestión de datos, clasificación inteligente de residuos y utilidades de servidor y terminal:

1. **`server.py` — Servidor Web y API REST Nativo en Python:**
   - Construido 100% sobre la biblioteca estándar (`http.server`, `sqlite3`, `json`).
   - **No requiere dependencias externas ni `pip install`**.
   - Expone endpoints REST en tiempo real:
     - `GET  /api/status` : Estado del motor Python y plataforma.
     - `GET  /api/sugerencias` : Lista sugerencias almacenadas en SQLite.
     - `POST /api/sugerencias` : Registra sugerencias ciudadanas.
     - `POST /api/clasificar` : Algoritmo de clasificación de residuos según Resolución 2184.
     - `GET  /api/estadisticas` : Métricas analíticas de la base de datos.
     - `GET  /api/dump-sql` : Descarga directa del volcado SQL.

2. **`ecoguia_cli.py` — Consola Interactiva (CLI) en Python:**
   - Interfaz interactiva de terminal con menús y arte ASCII.
   - Modos de ejecución rápida por banderas:
     - `python3 ecoguia_cli.py --menu` : Menú interactivo completo.
     - `python3 ecoguia_cli.py --clasificar "botella de vidrio"` : Clasifica un residuo al instante.
     - `python3 ecoguia_cli.py --listar` : Muestra las sugerencias guardadas en SQLite.
     - `python3 ecoguia_cli.py --calculadora 15 "plastico"` : Calcula CO₂ y agua ahorrada.
     - `python3 ecoguia_cli.py --exportar-json` : Exporta la base de datos a JSON.
     - `python3 ecoguia_cli.py --exportar-csv` : Exporta a archivo CSV.

3. **`app/recycling_logic.py` — Algoritmos de Negocio y Clasificación:**
   - Normalización léxica y análisis con expresiones regulares.
   - Mapeo de la Resolución 2184 de 2019:
     - ⚪ **Blanco:** Aprovechables limpios (plásticos, vidrios, metales, papel, cartón).
     - 🟢 **Verde:** Orgánicos aprovechables (restos de alimentos, podas, cáscaras, compostaje).
     - ⚫ **Negro:** No aprovechables (papel higiénico, servilletas, empaques metalizados, icopor).
     - 🔴 **Rojo:** Residuos peligrosos y posconsumo (pilas, baterías, medicamentos, luminarias).
   - Factores de conversión ambiental para calcular reducción de huella de carbono y preservación de árboles.

4. **`report_generator.py` — Generador de Informes Ambientales:**
   - Analiza los registros comunitarios y genera automáticamente informes ejecutivos en Markdown (`instance/reporte_ambiental.md`) y HTML (`dist/reporte_ambiental.html`).

5. **`tests/test_basic.py` — Suite de Pruebas Unitarias:**
   - 7 pruebas unitarias construidas con el módulo nativo `unittest`.
   - Verifica persistencia SQLite, clasificación léxica, cálculos de ahorro y exportación de archivos.
   - Ejecución: `python3 -m unittest discover tests`.

6. **`build_pages.py` — Pipeline de Integración y Construcción:**
   - Ejecuta las pruebas unitarias en Python antes de construir.
   - Verifica e inicializa la base de datos `instance/app.db`.
   - Genera respaldos en SQL (`instance/ecoguia_database.sql`) y API estática en JSON.
   - Compila la aplicación frontend para GitHub Pages.

---

## 💻 Comandos Principales de Python

```bash
# Iniciar servidor web nativo en Python (Puerto 5000):
python3 server.py

# Iniciar consola interactiva (CLI):
python3 ecoguia_cli.py --menu

# Clasificar un residuo desde la terminal:
python3 ecoguia_cli.py --clasificar "cáscara de plátano"

# Ejecutar las pruebas unitarias:
python3 -m unittest discover tests

# Generar informe ambiental:
python3 report_generator.py

# Compilar para producción y GitHub Pages:
python3 build_pages.py
```

---

## 🚀 Despliegue en GitHub Pages

Este repositorio incluye un flujo de trabajo de GitHub Actions en `.github/workflows/deploy.yml` completamente configurado con soporte para Python y Node.js.

### Pasos para Activar GitHub Pages:

1. Sube este repositorio a tu cuenta de GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: EcoGuía3R con backend Python y GitHub Pages"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/EcoGuia3R.git
   git push -u origin main
   ```

2. En la página de tu repositorio en GitHub:
   - Ve a **Settings** (Configuración) -> pestaña **Pages**.
   - En **Build and deployment** -> **Source**, selecciona: **GitHub Actions**.

3. Cada vez que hagas `git push` a `main` o `master`, GitHub Actions ejecutará automáticamente:
   - Configuración de Python 3.10 y Node.js 20.
   - Ejecución de pruebas unitarias (`python -m unittest discover tests`).
   - `python build_pages.py` para compilar y preparar los artefactos.
   - Despliegue en: `https://TU-USUARIO.github.io/EcoGuia3R/`.

---

## 🔐 Credenciales del Administrador

Para acceder al apartado administrativo desde la interfaz:
- **Usuario:** `admin`
- **Contraseña:** `admin123`

*(Puedes cambiar la contraseña o agregar nuevos administradores desde el panel).*

---

## 📁 Estructura del Proyecto

```text
EcoGuia3R/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Flujo de GitHub Actions (Python + Web)
├── app/
│   ├── recycling_logic.py      # Lógica de clasificación y cálculos ambientales
│   ├── tables.py               # Definición de tablas SQLite
│   ├── routes.py               # Rutas y API REST de Flask
│   ├── db.py                   # Conexión SQLite
│   └── cli.py                  # Comandos de Flask CLI
├── tests/
│   └── test_basic.py           # 7 pruebas unitarias con unittest
├── instance/
│   ├── app.db                  # Base de datos SQLite
│   ├── ecoguia_database.sql    # Volcado SQL de respaldo
│   ├── sugerencias_export.csv  # Exportación en CSV
│   └── reporte_ambiental.md    # Reporte ambiental en Markdown
├── public/
│   ├── favicon.svg             # Favicon ecológico
│   ├── robots.txt              # Reglas de rastreo web
│   └── .nojekyll               # Desactiva Jekyll en GitHub Pages
├── src/                        # Código fuente React + Tailwind CSS
│   ├── components/             # Componentes de la interfaz
│   │   ├── PythonModal.tsx     # Modal del ecosistema Python
│   │   ├── AdminPanel.tsx      # Panel de administración con pestaña Python
│   │   ├── WhyRecycle.tsx      # Sección ilustrada centrada
│   │   └── ...
│   └── App.tsx
├── server.py                   # Servidor HTTP nativo y API REST en Python
├── ecoguia_cli.py              # Consola CLI interactiva para terminal
├── report_generator.py         # Generador de informes ambientales
├── build_pages.py              # Pipeline de construcción y pruebas
├── main.py                     # Entry point alternativo de Flask
├── requirements.txt            # Dependencias opcionales de Python
├── vite.config.ts              # Configuración Vite con rutas relativas (base: './')
└── package.json
```

---

## 📄 Licencia

Proyecto educativo de código abierto bajo la Licencia MIT.
