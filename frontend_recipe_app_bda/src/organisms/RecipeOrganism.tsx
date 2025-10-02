import { useUser } from "@/context/userContext";
import { getAccessToken } from "@/helpers/auth";
import RecipeDetails from "@/molecules/recipe/RecipeDetails";
import { saveRecipeToEdit } from "@/helpers/auth";
import { Button } from "@heroui/button";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
const API_URL = "http://localhost:5000";

const RecipeOrganism = () => {
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    const res = await fetch(`${API_URL}/recipes/${id}`);
    return res.json();
  };

  const deleteRecipes = async (id: string) => {
    await fetch(`${API_URL}/recipes/delete_recipe/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  };

  const { data, isLoading } = useQuery({
    queryKey: ["oneRecipe", id],
    queryFn: fetchRecipes,
  });

  if (isLoading) return <>Cargando...</>;

  if (data.message) return <>{data.message}</>;

  if (data)
    return (
      <section className="grid grid-cols-12 gap-8 pb-8">
        <RecipeDetails data={data} />
        {user?.username == data.username && (
          <div className="flex flex-col gap-8">
            <Button
              color="secondary"
              onPress={() => {
                saveRecipeToEdit(JSON.stringify(data));
                navigate("/edit_recipe");
              }}
            >
              Editar
            </Button>
            <Button color="danger" onPress={() => deleteRecipes(data.id)}>
              Eliminar
            </Button>
          </div>
        )}
      </section>
    );
};

export default RecipeOrganism;
