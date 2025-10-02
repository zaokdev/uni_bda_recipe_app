import { useQuery } from "@tanstack/react-query";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { categorias, Recipe } from "@/types/index";
import { Link } from "@heroui/link";
import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:5000";

const FetchedAllRecipes = () => {
  const fetchRecipes = async () => {
    const res = await fetch(`${API_URL}/recipes`);
    return res.json();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["AllRecipes"],
    queryFn: fetchRecipes,
    staleTime: 1000 * 60 * 60, // 1 hora frescos
    gcTime: 1000 * 60 * 60 * 24, // 24 horas en caché
    refetchOnMount: "always",
  });

  const navigate = useNavigate();

  return (
    <section className="grid grid-cols-12 mt-4 gap-6">
      {data?.map((recipe: Recipe) => (
        <Card
          key={recipe.id}
          isPressable
          className="col-span-12 md:col-span-4"
          shadow="sm"
          onPress={() => {
            navigate(`/recipes/${recipe.id}`);
          }}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              alt={recipe.title}
              className="w-full object-cover h-[140px]"
              radius="lg"
              shadow="sm"
              width="100%"
              src={
                categorias.find(
                  (categoria) => categoria.id == recipe.category_id
                )?.imagenes
              }
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{recipe.title}</b>
            <p className="text-default-500">{recipe.username}</p>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};

export default FetchedAllRecipes;
