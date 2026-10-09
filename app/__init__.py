from pathlib import Path
from flask import Flask

from app.routes import register_routes
from app.cli import init_db
from app.tables import init_tables


def create_app(config_override=None):
    # App factory
    app = Flask(__name__)
    app.config.from_object("config.BaseConfig")

    # Apply configuration overrides (for test_basic.py)
    if config_override:
        app.config.update(config_override)

    # Register custom CLI command
    app.cli.add_command(init_db)

    # Check whether automatic database initialization is enabled
    if app.config.get("AUTO_INIT_DB", False):
        db_path = Path(app.config["DATABASE"])

        # Ensure the directory for the database file exists
        db_path.parent.mkdir(parents=True, exist_ok=True)

        # Initialize tables if the database file does not already exist
        if not db_path.exists():
            with app.app_context():
                init_tables()

    # Register application routes
    register_routes(app)
    return app
