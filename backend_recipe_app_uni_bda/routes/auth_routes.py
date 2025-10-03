import datetime
from flask_bcrypt import Bcrypt
from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from sqlalchemy import or_
from models.models import Users
from config.db import SessionLocal
from helpers.helpers import createId

auth = Blueprint("auth", __name__)

bcrypt = Bcrypt()


@auth.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"message": "Data is missing"}), 400

        email = email.strip().lower()

        session = SessionLocal()
        user = session.query(Users).filter(Users.email == email).first()
        if not user:
            raise FileNotFoundError("User not found")

        correctPassword = bcrypt.check_password_hash(
            pw_hash=user.password, password=password
        )

        if not correctPassword:
            raise ValueError("Incorrect password")

        expires = datetime.timedelta(hours=2)
        access_token = create_access_token(
            identity=user.id,
            expires_delta=expires,
            additional_claims={"username": user.username},
        )
        session.commit()
        return jsonify({"access_token": access_token}), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 404
    finally:
        session.close()


@auth.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        avatar_url = data.get("avatar_url")

        if not username or not email or not password:
            return jsonify({"error": "Data is missing"}), 400

        email = email.strip().lower()

        # se ejecuta la sesion y inicia la transaccion
        session = SessionLocal()
        existingUser = (
            session.query(Users)
            .filter(or_(Users.email == email, Users.username == username))
            .first()
        )

        # si el usuario ya existe, manda error
        if existingUser:
            raise FileExistsError("User already created")

        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
        id = createId(32)

        newUser = Users(
            id=id,
            username=username,
            email=email,
            password=hashed_password,
            avatar_url=avatar_url,
        )

        session.add(newUser)
        session.commit()
        return "creado"

    except Exception as e:
        return jsonify({"message": str(e)}), 404

    finally:
        session.close()
