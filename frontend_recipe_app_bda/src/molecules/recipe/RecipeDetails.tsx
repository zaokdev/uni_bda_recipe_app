import { categorias, Recipe } from "@/types";
import { Link } from "@heroui/link";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";

type props = {
  data: Recipe;
};

const RecipeDetails = ({ data }: props) => {
  return (
    <>
      <section className="bg-white rounded-md p-4 col-span-8" key={data.id}>
        <h1 className="text-xl md:text-3xl font-bold">{data.title}</h1>
        {
          <span>
            {
              categorias.find((categoria) => categoria.id == data.category_id)
                ?.nombre
            }
          </span>
        }
        <br />
        <span>{data.username}</span>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: data.steps }}
        ></div>
      </section>
    </>
  );
};

export default RecipeDetails;
