import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import RecipePage from "./pages/recipe";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import NewRecipeOrganism from "./organisms/NewRecipeOrganism";
import NewRecipePage from "./pages/new_recipe";
import EditRecipePage from "./pages/edit_recipe";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<RegisterPage />} path="/register" />
      <Route element={<LoginPage />} path="/login" />
      <Route path="/recipes/:id" element={<RecipePage />} />
      <Route path="/new_recipe" element={<NewRecipePage />} />
      <Route path="/edit_recipe" element={<EditRecipePage />} />
    </Routes>
  );
}

export default App;
