from typing import Optional

from sqlalchemy import ForeignKeyConstraint, Index, Integer, String, Text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class Categories(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(25), nullable=False)

    recipes: Mapped[list["Recipes"]] = relationship(
        "Recipes", back_populates="category"
    )


class Users(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(32), primary_key=True)
    username: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False)
    password: Mapped[str] = mapped_column(String(50), nullable=False)
    avatar_url: Mapped[Optional[str]] = mapped_column(String(500))

    recipes: Mapped[list["Recipes"]] = relationship("Recipes", back_populates="creator")


class Recipes(Base):
    __tablename__ = "recipes"
    __table_args__ = (
        ForeignKeyConstraint(
            ["category_id"], ["categories.id"], name="fk_recipe_category"
        ),
        ForeignKeyConstraint(
            ["creator_id"], ["users.id"], ondelete="CASCADE", name="fk_recipe_creator"
        ),
        Index("fk_recipe_category", "category_id"),
        Index("fk_recipe_creator", "creator_id"),
    )

    id: Mapped[str] = mapped_column(String(16), primary_key=True)
    creator_id: Mapped[str] = mapped_column(String(32), nullable=False)
    category_id: Mapped[int] = mapped_column(Integer, nullable=False)
    steps: Mapped[str] = mapped_column(Text, nullable=False)
    title: Mapped[str] = mapped_column(String(80), nullable=False)

    category: Mapped["Categories"] = relationship(
        "Categories", back_populates="recipes"
    )
    creator: Mapped["Users"] = relationship("Users", back_populates="recipes")
