import { useUser } from "@/context/userContext";
import { getUserInfo, setAccessToken } from "@/helpers/auth";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

const LoginOrganism = () => {
  const [error, setError] = useState();
  const { setUser } = useUser();
  const navigate = useNavigate();

  //MUTACION PARA LA PETICION POST
  const loginMutation = useMutation({
    mutationFn: async (formData: Record<string, any>) => {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
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
        setAccessToken(data.access_token);
        setUser(getUserInfo());
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    },
    onError: (error) => {
      console.error("Login fallido:", error);
    },
  });
  const onSubmit = async (e: any) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));
    console.log(formData);
    loginMutation.mutate(formData);
  };
  return (
    <Form className="w-full max-w-xs" onSubmit={onSubmit}>
      <Input
        isRequired
        errorMessage="Email invalido"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Escribe tu email..."
        type="email"
      />
      <Input
        isRequired
        errorMessage="Please enter a valid password"
        label="Contrasena"
        labelPlacement="outside"
        name="password"
        placeholder="Escribe tu contrasena..."
        type="password"
      />
      {error && <div className="p-4 bg-danger rounded-md">{error}</div>}
      <Button type="submit" variant="solid">
        Entrar
      </Button>
    </Form>
  );
};

export default LoginOrganism;
