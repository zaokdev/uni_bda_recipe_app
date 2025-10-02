import { jwtDecode } from "jwt-decode";
export const setAccessToken = (access_token: string) => {
  localStorage.setItem("access_token", access_token);
};

export const removeAccessToken = () => {
  localStorage.removeItem("access_token");
};

export const getUserInfo = () => {
  const access_token = localStorage.getItem("access_token");
  if (!access_token) return null;
  const userInfo = jwtDecode(access_token);
  return userInfo;
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const saveRecipeToEdit = (recipeData: any) => {
  localStorage.setItem("edit_recipe", recipeData);
};

export const getRecipeToEdit = () => {
  return localStorage.getItem("edit_recipe") || "";
};

export const deleteRecipeToEdit = () => {
  localStorage.removeItem("edit_recipe");
};
