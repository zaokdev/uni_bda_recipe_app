import { useUser } from "@/context/userContext";
import { getAccessToken, getUserInfo, setAccessToken } from "@/helpers/auth";
import { categorias } from "@/types";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useMutation } from "@tanstack/react-query";
import { Editor } from "primereact/editor";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:5000";

const NewRecipeOrganism = () => {
  const [steps, setSteps] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useUser();

  //MUTACION PARA LA PETICION POST
  const newRecipeRequest = useMutation({
    mutationFn: async (formData: Record<string, any>) => {
      const res = await fetch(`${API_URL}/recipes/create_recipe`, {
        method: "POST",
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
        const form = Object.fromEntries(new FormData(e.currentTarget));
        const finalSteps = steps.htmlValue;
        const finalRequestData = {
          ...form,
          steps: finalSteps,
          creator_id: user.sub,
        };
        console.log(finalRequestData);
        console.log(getAccessToken());
        newRecipeRequest.mutate(finalRequestData);
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
        />
        <Select
          className="col-span-2 md:mt-4 mb-4"
          placeholder="Categorias"
          name="category_id"
          aria-label="categories"
        >
          {categorias.map((categoria) => (
            <SelectItem key={categoria.id}>{categoria.nombre}</SelectItem>
          ))}
        </Select>
        <Editor
          name="steps"
          className="bg-gray-100 border-0"
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

export default NewRecipeOrganism;
