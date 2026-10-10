#!/usr/bin/env python3
"""
server.py - Servidor HTTP y API REST Nativo en Python para EcoGuía3R
Sin dependencias externas (usa la biblioteca estándar de Python: http.server, sqlite3, json).

Uso:
    python3 server.py
    python3 server.py --port 5000
    python3 server.py --host 0.0.0.0 --port 8080
"""

import sys
import os
import json
import sqlite3
import argparse
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
from pathlib import Path

# Añadir directorio actual al path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app.recycling_logic import (
    clasificar_residuo,
    calcular_ahorro_ecologico,
    obtener_estadisticas_db,
    REGLAS_RESIDUOS
)

DEFAULT_PORT = 5000
DEFAULT_HOST = "0.0.0.0"
DB_PATH = Path("instance/app.db")


def asegurar_base_de_datos():
    """Garantiza la existencia de la base de datos SQLite con datos iniciales."""
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(str(DB_PATH))
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS sugerencias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            correo TEXT NOT NULL,
            mensaje TEXT NOT NULL,
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cur.execute("""
        CREATE TABLE IF NOT EXISTS administradores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario TEXT NOT NULL UNIQUE,
            contraseña_hash TEXT NOT NULL
        )
    """)

    # Verificar si hay administradores
    cur.execute("SELECT COUNT(*) FROM administradores")
    if cur.fetchone()[0] == 0:
        # admin por defecto con hash sha256 compatible
        cur.execute(
            "INSERT INTO administradores (usuario, contraseña_hash) VALUES (?, ?)",
            ("admin", "scrypt:32768:8:1$defaultadminhash$example")
        )

    # Verificar si hay sugerencias iniciales
    cur.execute("SELECT COUNT(*) FROM sugerencias")
    if cur.fetchone()[0] == 0:
        cur.execute("""
            INSERT INTO sugerencias (nombre, correo, mensaje)
            VALUES 
            ('Comunidad Ambiental', 'contacto@ecoguia3r.org', 'Sugerimos instalar canecas de código de colores en el parque principal.'),
            ('Carlos Ramírez', 'carlos.r@gmail.com', 'Excelente guía para aprender a separar plásticos y orgánicos.')
        """)

    conn.commit()
    conn.close()


class EcoGuiaHTTPRequestHandler(SimpleHTTPRequestHandler):
    """Manejador HTTP que combina servidor de archivos estáticos y API REST en Python."""

    def __init__(self, *args, **kwargs):
        # Preferir servir la carpeta dist/ si existe
        dist_dir = Path("dist")
        if dist_dir.exists() and dist_dir.is_dir():
            directory = str(dist_dir.resolve())
        else:
            directory = str(Path(".").resolve())
        super().__init__(*args, directory=directory, **kwargs)

    def _responder_json(self, data, status_code=200):
        """Envía respuesta HTTP con encabezados JSON y CORS."""
        respuesta_bytes = json.dumps(data, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(respuesta_bytes)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(respuesta_bytes)

    def do_OPTIONS(self):
        """Maneja solicitudes pre-flight CORS."""
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        """Enrutador de solicitudes GET."""
        parsed = urlparse(self.path)
        path = parsed.path

        # Endpoints de API REST en Python
        if path == "/api/status":
            self._responder_json({
                "servicio": "EcoGuía3R Python Backend",
                "estado": "operativo",
                "python_version": sys.version,
                "plataforma": sys.platform,
                "base_de_datos": "SQLite 3",
                "motor": "Python http.server nativo"
            })
            return

        elif path == "/api/sugerencias":
            conn = sqlite3.connect(str(DB_PATH))
            conn.row_factory = sqlite3.Row
            cur = conn.cursor()
            cur.execute("SELECT id, nombre, correo, mensaje, fecha FROM sugerencias ORDER BY id DESC")
            sugerencias = [dict(row) for row in cur.fetchall()]
            conn.close()
            self._responder_json({"exito": True, "total": len(sugerencias), "sugerencias": sugerencias})
            return

        elif path == "/api/estadisticas":
            stats = obtener_estadisticas_db(str(DB_PATH))
            self._responder_json({"exito": True, "estadisticas": stats})
            return

        elif path == "/api/residuos":
            self._responder_json({"exito": True, "reglas": REGLAS_RESIDUOS})
            return

        elif path == "/api/dump-sql":
            conn = sqlite3.connect(str(DB_PATH))
            dump_text = "\n".join(conn.iterdump())
            conn.close()
            dump_bytes = dump_text.encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.send_header("Content-Disposition", 'attachment; filename="ecoguia_database.sql"')
            self.send_header("Content-Length", str(len(dump_bytes)))
            self.end_headers()
            self.wfile.write(dump_bytes)
            return

        # Servir archivos estáticos del frontend
        super().do_GET()

    def do_POST(self):
        """Enrutador de solicitudes POST."""
        parsed = urlparse(self.path)
        path = parsed.path

        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)

        try:
            data = json.loads(body.decode("utf-8")) if body else {}
        except json.JSONDecodeError:
            self._responder_json({"exito": False, "error": "JSON no válido"}, 400)
            return

        if path == "/api/sugerencias":
            nombre = data.get("nombre", "").strip()
            correo = data.get("correo", "").strip()
            mensaje = data.get("mensaje", "").strip()

            if not nombre or not correo or not mensaje:
                self._responder_json({
                    "exito": False,
                    "error": "Todos los campos (nombre, correo, mensaje) son obligatorios."
                }, 400)
                return

            conn = sqlite3.connect(str(DB_PATH))
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO sugerencias (nombre, correo, mensaje) VALUES (?, ?, ?)",
                (nombre, correo, mensaje)
            )
            conn.commit()
            nuevo_id = cur.lastrowid
            conn.close()

            self._responder_json({
                "exito": True,
                "mensaje": "Sugerencia registrada exitosamente en Python SQLite.",
                "id": nuevo_id
            }, 201)
            return

        elif path == "/api/clasificar":
            material = data.get("material", "") or data.get("residuo", "")
            resultado = clasificar_residuo(material)
            self._responder_json(resultado)
            return

        elif path == "/api/calculadora-ahorro":
            kilos = float(data.get("kilos", 1.0))
            tipo = data.get("tipo", "plastico")
            calculo = calcular_ahorro_ecologico(kilos, tipo)
            self._responder_json({"exito": True, "calculo": calculo})
            return

        self._responder_json({"exito": False, "error": f"Ruta POST no encontrada: {path}"}, 404)


def main():
    parser = argparse.ArgumentParser(description="Servidor HTTP / API REST nativo en Python para EcoGuía3R.")
    parser.add_argument("--port", type=int, default=DEFAULT_PORT, help=f"Puerto del servidor (por defecto: {DEFAULT_PORT})")
    parser.add_argument("--host", type=str, default=DEFAULT_HOST, help=f"Host del servidor (por defecto: {DEFAULT_HOST})")
    args = parser.parse_args()

    asegurar_base_de_datos()

    server_address = (args.host, args.port)
    httpd = HTTPServer(server_address, EcoGuiaHTTPRequestHandler)

    print("\n" + "="*60)
    print("🌱 Servidor Nativo EcoGuía3R en Python Iniciado con Éxito")
    print(f"📡 Escuchando en: http://{args.host}:{args.port}")
    print(f"📦 Base de datos: {DB_PATH.resolve()}")
    print("🔌 Endpoints de API disponibles:")
    print("   • GET  /api/status")
    print("   • GET  /api/sugerencias")
    print("   • POST /api/sugerencias")
    print("   • POST /api/clasificar")
    print("   • GET  /api/estadisticas")
    print("   • GET  /api/residuos")
    print("   • GET  /api/dump-sql")
    print("="*60 + "\n")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido de manera ordenada.")
        httpd.server_close()


if __name__ == "__main__":
    main()
