import sys
import os
import tempfile
import sqlite3

# Ensure project root is on the import path for pytest
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app import create_app
from app.tables import init_tables
from app.db import get_connection


def test_notes_table_persistence():
    # Marker to show the start of the test during execution
    print("Starting notes table persistence test.")

    # Create a temporary SQLite database file and get its file descriptor and path
    db_fd, db_path = tempfile.mkstemp()
    print(f"Temporary database created at: {db_path}")

    # Create the Flask application instance
    app = create_app({
        "DATABASE": db_path,
        "AUTO_INIT_DB": False,
    })

    # Override the DATABASE config so the app uses the temporary database
    app.config["DATABASE"] = db_path

    # Push an application context so current_app and config are available
    with app.app_context():
        print("App context entered.")

        # Initialize database tables in the temporary database
        init_tables()
        print("Notes table initialized.")

        # Open a database connection using the app's configured DATABASE path
        conn = get_connection()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()

        # Insert a test record into the notes table
        print("Inserting test note.")
        cur.execute(
            "INSERT INTO notes (title, content) VALUES (?, ?)",
            ("Test note", "This is a test")
        )
        conn.commit()
        print("Test note inserted.")

        # Query the inserted record to verify persistence
        print("Querying inserted note.")
        cur.execute(
            "SELECT title, content FROM notes WHERE title = ?",
            ("Test note",)
        )
        row = cur.fetchone()
        conn.close()
        print("Query executed.")

        # Output the fetched row for debugging visibility
        print("Query result:", row)

        # Assert that the persisted data matches what was inserted
        assert row["title"] == "Test note"
        assert row["content"] == "This is a test"
        print("Assertion passed.")

    # Close and remove the temporary database file
    os.close(db_fd)
    os.unlink(db_path)
    print("Temporary database cleaned up.")

    # Marker indicating successful test completion
    print("Test completed.")
