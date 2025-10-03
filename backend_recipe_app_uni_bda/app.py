from dotenv import load_dotenv
from flask import Flask
from config.db import init_db
from routes.recipes_routes import recipes
from routes.auth_routes import auth
from flask_jwt_extended import JWTManager
from flask_cors import CORS


app = Flask(__name__)

jwt = JWTManager()

load_dotenv()

init_db(app)
jwt.init_app(app)
CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(recipes)
app.register_blueprint(auth)


if __name__ == "__main__":
    app.run(debug=True)
