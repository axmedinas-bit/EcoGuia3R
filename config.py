import os


class BaseConfig:
    # Default database path (can be overridden via environment variable)
    DATABASE = os.getenv("DATABASE", "instance/app.db")

    AUTO_INIT_DB = True

    # Secret key for sessions and flash messages
    SECRET_KEY = os.getenv("SECRET_KEY", "dev")