from dotenv import load_dotenv

from app import create_app


# Load environment variables from .env file
# load_dotenv()

# Create the Flask application using the app factory
app = create_app()

if __name__ == "__main__":
    # Run the development server
    app.run(host="0.0.0.0", port=5000)
