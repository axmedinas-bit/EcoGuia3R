import click
from app.tables import init_tables


@click.command("init-db")
def init_db():
    # Initialize database tables
    init_tables()

    # Marker to show successful database initialization
    click.echo("Database initialized.")
