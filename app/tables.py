from app.db import get_connection


def init_tables():
    conn = get_connection()
    cursor = conn.cursor()

    # Tabla de sugerencias de los usuarios
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS sugerencias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            correo TEXT NOT NULL,
            mensaje TEXT NOT NULL,
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    )

    # Tabla de administradores
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS administradores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario TEXT NOT NULL UNIQUE,
            contraseña_hash TEXT NOT NULL
        )
        """
    )

    conn.commit()
    conn.close()
