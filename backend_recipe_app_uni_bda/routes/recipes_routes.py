from flask import Blueprint, jsonify, render_template, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import and_
from helpers.helpers import createId, normalizeText
from models.models import Recipes, Users
from config.db import SessionLocal


recipes = Blueprint("recipes", __name__)


@recipes.route("/recipes", methods=["GET"])
def get_recipes():
    session = SessionLocal()
    recipes = (
        session.query(Recipes, Users).join(Users, Users.id == Recipes.creator_id).all()
    )
    recipes_json = []
    for recipe, user in recipes:
        recipes_json.append(
            {
                "title": recipe.title,
                "id": recipe.id,
                "creator_id": recipe.creator_id,
                "username": user.username,
                "category_id": recipe.category_id,
                "steps": recipe.steps,
            }
        )

    session.commit()
    return jsonify(recipes_json), 200


@recipes.route("/recipes/search", methods=["GET"])
def search():
    try:
        title = request.args.get("title")
        category = request.args.get("category")
        session = SessionLocal()

        query = session.query(Recipes, Users).join(
            Users, Users.id == Recipes.creator_id
        )
        filters = []
        if title:
            # ilike hace que sea insensible a las mayusculas y minusculas
            normalizedTitle = normalizeText(title)
            filters.append(Recipes.title.ilike(f"%{normalizedTitle}%"))
        if category:
            filters.append(Recipes.category_id == category)

        if len(filters) == 0:
            raise ValueError("missing filters")

        finalQuery = query.filter(and_(*filters)).all()

        if len(finalQuery) == 0:
            raise ValueError("missing something to search")

        session.commit()

        finalJSON = []
        for recipe, user in finalQuery:
            finalJSON.append(
                {
                    "id": recipe.id,
                    "title": recipe.title,
                    "username": user.username,
                    "creator_id": recipe.creator_id,
                    "category_id": recipe.category_id,
                    "steps": recipe.steps,
                }
            )

        return jsonify(finalJSON), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 404
    finally:
        session.close()


@recipes.route("/recipes/<id>", methods=["GET"])
def get_one_recipe(id):
    try:
        session = SessionLocal()
        query = (
            session.query(Recipes, Users)
            .join(Users, Users.id == Recipes.creator_id)
            .filter(Recipes.id == id)
            .first()
        )

        if not query:
            raise FileNotFoundError("Recipe not found")

        recipe, user = query

        recipe_json = {
            "id": recipe.id,
            "title": recipe.title,
            "username": user.username,
            "creator_id": recipe.creator_id,
            "category_id": recipe.category_id,
            "steps": recipe.steps,
        }

        session.commit()
        return jsonify(recipe_json), 200
    except FileNotFoundError as e:
        return jsonify({"message": str(e)}), 404
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    finally:
        session.close()


@recipes.route("/recipes/by_user", methods=["GET"])
def get_by_user():
    try:
        session = SessionLocal()
        creator_id = request.args.get("creator_id")
        if not creator_id:
            raise FileNotFoundError("No user found")
        recipes = (
            session.query(Recipes, Users)
            .join(Users, Users.id == Recipes.creator_id)
            .filter(Recipes.creator_id == creator_id)
            .all()
        )

        recipes_json = []
        for recipe, user in recipes:
            recipes_json.append(
                {
                    "id": recipe.id,
                    "title": recipe.title,
                    "username": user.username,
                    "creator_id": recipe.creator_id,
                    "category_id": recipe.category_id,
                    "steps": recipe.steps,
                }
            )

        if len(recipes_json) == 0:
            raise FileNotFoundError(
                "No recipes created by this user or user does not exist"
            )
        session.commit()
        return jsonify(recipes_json), 200

    except FileNotFoundError as e:
        return jsonify({"message": str(e)}), 404

    except Exception as e:
        return jsonify({"message": str(e)}), 500
    finally:
        session.close()


@recipes.route("/recipes/create_recipe", methods=["POST"])
@jwt_required()
def create_recipe():
    try:
        data = request.get_json()

        id = createId(16)
        creator_id = get_jwt_identity()
        category_id = data.get("category_id")
        steps = data.get("steps")
        title = data.get("title")
        if not category_id or not steps or not title or not id:
            raise FileNotFoundError("Recipe not found")

        session = SessionLocal()
        newRecipe = Recipes(
            id=id,
            creator_id=creator_id,
            category_id=category_id,
            steps=steps,
            title=title,
        )
        session.add(newRecipe)
        session.commit()
        return jsonify({"message": id}), 201

    except FileNotFoundError as e:
        return jsonify({"message": str(e)}), 404
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    finally:
        session.close()


@recipes.route("/recipes/update_recipe/<id>", methods=["PUT"])
@jwt_required()
def update_recipe(id):
    try:
        data = request.get_json()
        creator_id = get_jwt_identity()
        session = SessionLocal()
        recipe = session.query(Recipes).filter(Recipes.id == id).first()

        if recipe.creator_id != creator_id:
            raise KeyError("Not Authorized to change other users recipes")

        if not recipe:
            raise FileNotFoundError("Recipe not found")

        if not data or "category_id" not in data or "steps" not in data:
            raise FileNotFoundError("Data not found")

        recipe.title = data["title"]
        recipe.category_id = data["category_id"]
        recipe.steps = data["steps"]

        session.commit()
        return jsonify(), 201

    except KeyError as e:
        return jsonify({"message": str(e)}), 401
    except FileNotFoundError as e:
        return jsonify({"message": str(e)}), 404
    except Exception as e:
        return jsonify({"message": str(e)}), 500


# TODO: AGREGAR VERIFICACION JWT
@recipes.route("/recipes/delete_recipe/<id>", methods=["DELETE"])
@jwt_required()
def delete(id):
    try:
        creator_id = get_jwt_identity()
        session = SessionLocal()
        recipe = session.query(Recipes).filter(Recipes.id == id).first()
        if creator_id != recipe.creator_id:
            raise KeyError("Not authorized to delete other users recipes")
        session.delete(recipe)
        session.commit()
        return jsonify({"message": "Created"}), 204

    except KeyError as e:
        jsonify({"message": str(e)}), 401
    except Exception as e:
        jsonify({"message": str(e)}), 500
    finally:
        session.close()
