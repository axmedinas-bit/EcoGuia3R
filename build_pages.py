"""
build_pages.py
Script de automatización en Python para compilar y preparar EcoGuía3R para GitHub Pages.
Mantiene sincronizada la base de datos SQLite y genera los artefactos para despliegue estático.
"""

import os
import sys
import sqlite3
import subprocess

def init_sqlite_database():
    """Inicializa la base de datos SQLite instance/app.db con el esquema de Ecoguía."""
    os.makedirs("instance", exist_ok=True)
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
    
    # Exportar dump SQL para respaldo y compatibilidad
    sql_backup_path = os.path.join("instance", "ecoguia_database.sql")
    with open(sql_backup_path, "w", encoding="utf-8") as f:
        for line in conn.iterdump():
            f.write(f"{line}\n")
    print(f"📦 Respaldo SQL generado en {sql_backup_path}")

    conn.close()
    print(f"✅ Base de datos SQLite verificada en {db_path}")

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

    # Copiar respaldo SQL a dist/ para descarga directa
    src_sql = os.path.join("instance", "ecoguia_database.sql")
    if os.path.exists(src_sql):
        dst_sql = os.path.join("dist", "ecoguia_database.sql")
        with open(src_sql, "r", encoding="utf-8") as s, open(dst_sql, "w", encoding="utf-8") as d:
            d.write(s.read())
        print("✅ Archivo ecoguia_database.sql copiado a dist/")

if __name__ == "__main__":
    print("=== EcoGuía3R · Pipeline de Construcción Python ===")
    init_sqlite_database()
    build_web_assets()
    print("🎉 Proyecto listo para publicación en GitHub Pages.")
