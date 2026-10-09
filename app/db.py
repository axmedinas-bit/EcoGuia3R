import sqlite3
from pathlib import Path
from flask import current_app


def get_connection():
    # Read database path from app configuration
    db_path = current_app.config["DATABASE"]

    # Ensure the database directory exists
    Path(db_path).parent.mkdir(exist_ok=True)

    # Return a new SQLite connection
    return sqlite3.connect(db_path)
