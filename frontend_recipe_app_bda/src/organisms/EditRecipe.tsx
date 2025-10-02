import { API_URL, categorias, Recipe } from "@/types";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Editor } from "primereact/editor";
import React, { useState } from "react";
import { Form } from "@heroui/form";
import { useMutation } from "@tanstack/react-query";
import { deleteRecipeToEdit, getAccessToken } from "@/helpers/auth";
import { useNavigate } from "react-router-dom";

const EditRecipeOrganism = ({
  id,
  steps,
  category_id,
  title,
  username,
  creator_id,
}: Recipe) => {
  const [stepsState, setSteps] = useState<any>(steps);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const editRecipeRequest = useMutation({
    mutationFn: async (formData: Record<string, any>) => {
      const res = await fetch(`${API_URL}/recipes/update_recipe/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      //Esto es para que pueda aparecer el error en la cosa esa del UI
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        setError(errorData.message);
        throw new Error(
          errorData?.message || `Error ${res.status}: ${res.statusText}`
        );
      }

      return res.json();
    },
    onSuccess: (data) => {
      console.log("Login correcto:", data);
      deleteRecipeToEdit();
      // aquí puedes guardar el token en localStorage o context
      try {
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    },
    onError: (error) => {
      console.error("Login fallido:", error);
    },
  });

  return (
    <Form
      className="pb-8"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e);
        const formData = Object.fromEntries(new FormData(e.currentTarget));
        const finalFormData = {
          ...formData,
          creator_id: Number(creator_id),
          steps: stepsState.htmlValue || steps,
        };
        console.log(finalFormData);
        editRecipeRequest.mutate(finalFormData);
      }}
    >
      <div>
        <Input
          isRequired
          errorMessage="invalido"
          labelPlacement="outside"
          name="title"
          placeholder="Titulo"
          type="text"
          className="mb-4"
          defaultValue={title}
        />
        <Select
          className="col-span-2 md:mt-4 mb-4"
          placeholder="Categorias"
          name="category_id"
          aria-label="categories"
          defaultSelectedKeys={String(category_id)}
        >
          {categorias.map((categoria) => (
            <SelectItem key={categoria.id}>{categoria.nombre}</SelectItem>
          ))}
        </Select>
        <Editor
          name="steps"
          className="bg-gray-100 border-0"
          value={steps}
          onTextChange={(v) => {
            setSteps(v);
          }}
        />
      </div>
      <Button type="submit" className="mt-3">
        Submit
      </Button>
    </Form>
  );
};

export default EditRecipeOrganism;
