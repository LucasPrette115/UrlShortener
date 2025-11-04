from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from src.routes.url_routes import url_bp

load_dotenv()

app = Flask(__name__)
CORS(app)  

app.register_blueprint(url_bp)

if __name__ == "__main__":
    app.run(debug=True, port=5000)