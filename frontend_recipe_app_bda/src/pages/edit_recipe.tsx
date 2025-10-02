import AuthNeeded from "@/layouts/AuthNeeded";
import DefaultLayout from "@/layouts/default";
import EditRecipeOrganism from "@/organisms/EditRecipe";
import { getRecipeToEdit } from "@/helpers/auth";
import { useNavigate } from "react-router-dom";

const EditRecipePage = () => {
  const navigate = useNavigate();
  const stringifiedRecipe = getRecipeToEdit();
  if (stringifiedRecipe == "") {
    navigate("/");
  }
  const recipe = JSON.parse(getRecipeToEdit());
  console.log(recipe);

  return (
    <DefaultLayout>
      <AuthNeeded>
        <EditRecipeOrganism
          category_id={recipe.category_id}
          creator_id={recipe.creator_id}
          id={recipe.id}
          steps={recipe.steps}
          title={recipe.title}
          username={recipe.username}
        />
      </AuthNeeded>
    </DefaultLayout>
  );
};

export default EditRecipePage;
