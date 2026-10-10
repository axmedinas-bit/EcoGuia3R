"""
build_pages.py
Pipeline de construcción, análisis y automatización en Python para EcoGuía3R.
Mantiene sincronizada la base de datos SQLite, ejecuta pruebas unitarias,
genera reportes ambientales y prepara los artefactos para GitHub Pages.
"""

import os
import sys
import json
import sqlite3
import subprocess
from pathlib import Path

# Agregar directorio actual para importar módulos de la app
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app.recycling_logic import (
    obtener_estadisticas_db,
    exportar_sugerencias_json,
    exportar_sugerencias_csv,
    exportar_database_sql,
    exportar_schema_sql,
    REGLAS_RESIDUOS
)
from report_generator import generar_reporte


def ejecutar_pruebas_unitarias():
    """Ejecuta la suite de pruebas unitarias en Python antes de construir."""
    print("🧪 Ejecutando pruebas unitarias en Python (unittest)...")
    res = subprocess.run([sys.executable, "-m", "unittest", "discover", "tests"], capture_output=True, text=True)
    if res.returncode != 0:
        print("❌ Fallaron las pruebas unitarias en Python:")
        print(res.stderr)
        sys.exit(1)
    print("✅ Todas las pruebas unitarias en Python pasaron exitosamente.")


def init_sqlite_database():
    """Inicializa la base de datos SQLite instance/app.db con el esquema de Ecoguía y genera volcados SQL."""
    os.makedirs("instance", exist_ok=True)
    os.makedirs("public", exist_ok=True)
    db_path = os.path.join("instance", "app.db")
    
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    
    # Tabla sugerencias
    cur.execute("""
        CREATE TABLE IF NOT EXISTS sugerencias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            correo TEXT NOT NULL,
            mensaje TEXT NOT NULL,
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Tabla administradores
    cur.execute("""
        CREATE TABLE IF NOT EXISTS administradores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario TEXT NOT NULL UNIQUE,
            contraseña_hash TEXT NOT NULL
        )
    """)
    
    # Administrador por defecto (admin / admin123)
    admin_hash = "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9"
    cur.execute("""
        INSERT OR IGNORE INTO administradores (id, usuario, contraseña_hash)
        VALUES (1, 'admin', ?)
    """, (admin_hash,))
    
    # Sugerencias iniciales si la tabla está vacía
    cur.execute("SELECT count(*) FROM sugerencias")
    count = cur.fetchone()[0]
    if count == 0:
        sugerencias_iniciales = [
            ("María Gómez", "maria.gomez@eco.co", "Instalar puntos limpios de pilas y bombillos posconsumo en los parques."),
            ("Carlos Rojas", "carlos.rojas@udea.edu.co", "Agregar infografías descargables para las zonas comunes de conjuntos residenciales."),
            ("Valentina Castro", "valen.castro@gmail.com", "Talleres comunitarios de compostaje para aprovechar la caneca verde.")
        ]
        cur.executemany("""
            INSERT INTO sugerencias (nombre, correo, mensaje)
            VALUES (?, ?, ?)
        """, sugerencias_iniciales)
    
    conn.commit()
    conn.close()
    print(f"✅ Base de datos SQLite verificada en {db_path}")

    # Generar volcados SQL completos (datos + estructura) y de esquema DDL
    exportar_database_sql(db_path, "instance/ecoguia_database.sql")
    exportar_schema_sql(db_path, "instance/ecoguia_schema.sql")
    
    # Exportar también en public/ para que Vite los incluya en el empaquetado
    exportar_database_sql(db_path, "public/ecoguia_database.sql")
    exportar_schema_sql(db_path, "public/ecoguia_schema.sql")
    print("📦 Respaldo SQL completo y esquema DDL exportados en instance/ y public/")

    # Exportar CSV en instance/
    exportar_sugerencias_csv(db_path, "instance/sugerencias_export.csv")


def build_web_assets():
    """Ejecuta el build de Vite para generar los archivos estáticos en dist/."""
    print("🚀 Compilando la aplicación web para GitHub Pages...")
    res = subprocess.run(["npm", "run", "build"], capture_output=True, text=True)
    if res.returncode != 0:
        print("❌ Error compilando Vite:", res.stderr)
        sys.exit(1)
    
    print("✅ Artefactos estáticos compilados exitosamente en dist/")
    
    # Crear archivo .nojekyll en dist/ para que GitHub Pages sirva todos los recursos
    nojekyll_path = os.path.join("dist", ".nojekyll")
    with open(nojekyll_path, "w") as f:
        f.write("")
    
    # Copiar index.html a 404.html para soporte de SPA routing en GitHub Pages
    dist_index = os.path.join("dist", "index.html")
    dist_404 = os.path.join("dist", "404.html")
    if os.path.exists(dist_index):
        with open(dist_index, "r", encoding="utf-8") as src, open(dist_404, "w", encoding="utf-8") as dst:
            dst.write(src.read())
        print("✅ Archivo 404.html generado para compatibilidad con GitHub Pages.")

    # Copiar respaldo SQL completo y esquema DDL a dist/ para descarga directa
    for sql_file in ["ecoguia_database.sql", "ecoguia_schema.sql"]:
        src_sql = os.path.join("instance", sql_file)
        if os.path.exists(src_sql):
            dst_sql = os.path.join("dist", sql_file)
            with open(src_sql, "r", encoding="utf-8") as s, open(dst_sql, "w", encoding="utf-8") as d:
                d.write(s.read())
            print(f"✅ Archivo {sql_file} copiado a dist/")

    # Exportar datos analíticos estáticos JSON a public/ y dist/
    exportar_sugerencias_json("instance/app.db", "public/api_sugerencias.json")
    exportar_sugerencias_json("instance/app.db", "dist/api_sugerencias.json")
    
    # Exportar reglas en JSON para acceso estático
    with open("public/api_residuos.json", "w", encoding="utf-8") as f:
        json.dump({"exito": True, "reglas": REGLAS_RESIDUOS}, f, ensure_ascii=False, indent=2)
    with open("dist/api_residuos.json", "w", encoding="utf-8") as f:
        json.dump({"exito": True, "reglas": REGLAS_RESIDUOS}, f, ensure_ascii=False, indent=2)
    print("✅ API estática JSON exportada a dist/ y public/ (api_sugerencias.json, api_residuos.json)")

    # Generar reporte ambiental HTML en dist/ y copiar a public/
    generar_reporte()
    dist_rep = os.path.join("dist", "reporte_ambiental.html")
    pub_rep = os.path.join("public", "reporte_ambiental.html")
    if os.path.exists(dist_rep):
        with open(dist_rep, "r", encoding="utf-8") as src, open(pub_rep, "w", encoding="utf-8") as dst:
            dst.write(src.read())


if __name__ == "__main__":
    print("\n" + "="*55)
    print("=== 🌱 EcoGuía3R · Pipeline de Construcción Python ===")
    print("="*55)
    ejecutar_pruebas_unitarias()
    init_sqlite_database()
    build_web_assets()
    print("🎉 Pipeline completado con éxito. Proyecto listo para GitHub Pages.\n")
