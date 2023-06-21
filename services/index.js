export const getRecipesSuggestions = async (ingredients) => {
  const response = await fetch("/api/recipes", {
    method: "POST",
    body: ingredients,
  });

  const jsonData = await response.json();

  return jsonData;
};

export const getIngredientsList = async () => {
  const response = await fetch("/api/ingredients", {
    method: "GET",
  });

  const jsonData = await response.json();

  return jsonData;
};
