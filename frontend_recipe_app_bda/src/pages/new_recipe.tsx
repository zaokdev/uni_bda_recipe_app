import AuthNeeded from "@/layouts/AuthNeeded";
import DefaultLayout from "@/layouts/default";
import NewRecipeOrganism from "@/organisms/NewRecipeOrganism";
import React from "react";

const NewRecipePage = () => {
  return (
    <DefaultLayout>
      <AuthNeeded>
        <NewRecipeOrganism />
      </AuthNeeded>
    </DefaultLayout>
  );
};

export default NewRecipePage;
