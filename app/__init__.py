from pathlib import Path

def create_app(config_override=None):
    """Factory de aplicación Flask (si Flask está instalado)."""
    try:
        from flask import Flask
    except ImportError as e:
        raise ImportError(
            "Flask no está instalado en este entorno. Instálalo con: pip install -r requirements.txt "
            "o ejecuta el servidor nativo estándar de Python con: python3 server.py"
        ) from e

    from app.routes import register_routes
    from app.cli import init_db
    from app.tables import init_tables

    app = Flask(__name__)
    app.config.from_object("config.BaseConfig")

    if config_override:
        app.config.update(config_override)

    app.cli.add_command(init_db)

    if app.config.get("AUTO_INIT_DB", False):
        db_path = Path(app.config["DATABASE"])
        db_path.parent.mkdir(parents=True, exist_ok=True)
        if not db_path.exists():
            with app.app_context():
                init_tables()

    register_routes(app)
    return app
