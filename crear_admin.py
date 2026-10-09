from getpass import getpass
import sqlite3
from werkzeug.security import generate_password_hash

from app import create_app
from app.db import get_connection

app = create_app()

with app.app_context():
    usuario = input("Usuario del administrador: ").strip()
    contrasena = getpass("Contraseña (no se verá mientras escribes): ")

    if not usuario or not contrasena:
        print("El usuario y la contraseña no pueden estar vacíos.")
        raise SystemExit

    conn = get_connection()
    try:
        conn.execute(
            "INSERT INTO administradores (usuario, contraseña_hash) VALUES (?, ?)",
            (usuario, generate_password_hash(contrasena)),
        )
        conn.commit()
        print("Administrador creado correctamente.")
    except sqlite3.IntegrityError:
        print("Ese usuario ya existe.")
    finally:
        conn.close()