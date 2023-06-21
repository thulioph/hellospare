export const _formatIngredients = (ingredients) => {
  const phrases = [];

  ingredients.forEach(({ qtd, product }) => {
    phrases.push(`${qtd} of ${product}`);
  });

  return phrases.join(" ");
};

export const _formatRecipe = (recipe) => {
  const result = recipe.data.choices[0].message.content;
  const newRecipe = JSON.parse(result);

  return newRecipe;
};
