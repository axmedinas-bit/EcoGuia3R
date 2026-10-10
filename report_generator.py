#!/usr/bin/env python3
"""
report_generator.py - Generador de Reportes Ambientales en Python
Analiza la base de datos de sugerencias, calcula métricas de impacto y exporta reportes en HTML y Markdown.

Uso:
    python3 report_generator.py
"""

import os
import sys
import json
import sqlite3
from datetime import datetime
from pathlib import Path

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app.recycling_logic import obtener_estadisticas_db, calcular_ahorro_ecologico, REGLAS_RESIDUOS

DB_PATH = Path("instance/app.db")
DIST_PATH = Path("dist")


def generar_reporte():
    print("📊 Iniciando generador de reporte ambiental en Python...")

    stats = obtener_estadisticas_db(str(DB_PATH))
    total_sug = stats.get("total_sugerencias", 0)

    # Estimación de impacto pedagógico y comunitario basado en la actividad
    kg_estimados = max(50.0, total_sug * 25.0)
    impacto_plastico = calcular_ahorro_ecologico(kg_estimados * 0.4, "plastico")
    impacto_papel = calcular_ahorro_ecologico(kg_estimados * 0.35, "papel")
    impacto_vidrio = calcular_ahorro_ecologico(kg_estimados * 0.25, "vidrio")

    co2_total = round(impacto_plastico["co2_evitado_kg"] + impacto_papel["co2_evitado_kg"] + impacto_vidrio["co2_evitado_kg"], 1)
    agua_total = round(impacto_plastico["agua_ahorrada_litros"] + impacto_papel["agua_ahorrada_litros"] + impacto_vidrio["agua_ahorrada_litros"], 1)
    energia_total = round(impacto_plastico["energia_ahorrada_kwh"] + impacto_papel["energia_ahorrada_kwh"] + impacto_vidrio["energia_ahorrada_kwh"], 1)

    fecha_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # 1. Reporte Markdown
    md_content = f"""# 🌿 EcoGuía3R · Informe de Gestión y Lógica Ambiental
> Generado automáticamente por `report_generator.py` con Python 3.
> Fecha de corte: {fecha_str}

## 📌 Resumen Ejecutivo
- **Total sugerencias recibidas:** {total_sug}
- **Administradores activos:** {stats.get('total_administradores', 0)}
- **Estimado de residuos separados en origen:** {kg_estimados} kg
- **Reducción de huella de carbono:** {co2_total} kg de CO₂ equivalente
- **Ahorro de agua potable estimado:** {agua_total} litros
- **Ahorro de energía en manufactura:** {energia_total} kWh

## 🎨 Código de Colores según Resolución 2184
1. **Contenedor Blanco:** Residuos aprovechables limpios y secos (plásticos, vidrios, metales, papeles y cartones).
2. **Contenedor Verde:** Residuos orgánicos aprovechables (restos de alimentos, podas, cáscaras, compostaje).
3. **Contenedor Negro:** Residuos no aprovechables (papel higiénico, servilletas, icopor sucio, envolturas metalizadas).
4. **Contenedor Rojo:** Residuos peligrosos e infecciosos (pilas, luminarias, medicamentos vencidos, baterías).

## 🐍 Tecnologías del Backend Python
- **Motor de persistencia:** SQLite 3 nativo (`instance/app.db`)
- **Servidor nativo HTTP y REST:** `server.py`
- **Framework Web opcional:** Flask (`main.py`)
- **CLI interactiva:** `ecoguia_cli.py`
- **Suite de pruebas unitarias:** `tests/test_basic.py`
- **Pipeline de despliegue:** `build_pages.py`
"""

    md_path = Path("instance/reporte_ambiental.md")
    md_path.parent.mkdir(parents=True, exist_ok=True)
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(md_content)
    print(f"✅ Reporte Markdown generado en {md_path}")

    # 2. Reporte HTML para distribución web
    html_content = f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>EcoGuía3R · Informe Ambiental Python</title>
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; color: #1e293b; background: #f8fafc; }}
    .card {{ background: white; padding: 30px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border: 1px solid #e2e8f0; }}
    h1 {{ color: #047857; margin-top: 0; }}
    .metric-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin: 24px 0; }}
    .metric-box {{ background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 16px; text-align: center; }}
    .metric-val {{ font-size: 28px; font-weight: 800; color: #065f46; }}
    .metric-lbl {{ font-size: 13px; color: #047857; font-weight: 600; text-transform: uppercase; }}
    .badge {{ display: inline-block; background: #d1fae5; color: #065f46; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; }}
    footer {{ margin-top: 30px; font-size: 13px; color: #64748b; text-align: center; }}
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">🐍 Reporte Python · EcoGuía3R</span>
    <h1>Informe de Gestión y Sostenibilidad</h1>
    <p>Reporte generado mediante el pipeline en Python a partir de la base de datos comunitaria de reciclaje.</p>
    
    <div class="metric-grid">
      <div class="metric-box">
        <div class="metric-val">{total_sug}</div>
        <div class="metric-lbl">Sugerencias Ciudadanas</div>
      </div>
      <div class="metric-box">
        <div class="metric-val">{co2_total} kg</div>
        <div class="metric-lbl">CO₂ Evitado</div>
      </div>
      <div class="metric-box">
        <div class="metric-val">{agua_total} L</div>
        <div class="metric-lbl">Agua Ahorrada</div>
      </div>
      <div class="metric-box">
        <div class="metric-val">{energia_total} kWh</div>
        <div class="metric-lbl">Energía Preservada</div>
      </div>
    </div>

    <h3>Módulos Python en el Repositorio:</h3>
    <ul>
      <li><code>server.py</code>: Servidor HTTP nativo y API REST en Python.</li>
      <li><code>ecoguia_cli.py</code>: Consola interactiva CLI para clasificar residuos.</li>
      <li><code>app/recycling_logic.py</code>: Algoritmos de clasificación según Res. 2184.</li>
      <li><code>tests/test_basic.py</code>: Suite de pruebas unitarias automáticas.</li>
      <li><code>build_pages.py</code>: Pipeline de integración continua y compilación.</li>
    </ul>

    <footer>
      Generado el {fecha_str} &bull; EcoGuía3R &bull; Compatible con GitHub Pages
    </footer>
  </div>
</body>
</html>
"""
    if DIST_PATH.exists():
        html_path = DIST_PATH / "reporte_ambiental.html"
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(html_content)
        print(f"✅ Reporte HTML generado en {html_path}")

    return True


if __name__ == "__main__":
    generar_reporte()
