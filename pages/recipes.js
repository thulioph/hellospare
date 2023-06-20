import React from "react";

const Dale = async (ingredients) => {
  const response = await fetch("/api/recipes", {
    method: "POST",
    body: ingredients,
  });

  const jsonData = await response.json();

  console.log(jsonData);
};

const RecipesPage = () => {
  const ingredients =
    "250g of mixed minced meat, 600g potatoes, 1 piece Apple, 80g bacon, 10g Parsely, 1 piece onion";

  const handleBtnClick = async () => {
    await Dale(ingredients);
  };

  return (
    <section>
      <header>
        <h1>Recipes Page</h1>
      </header>

      <main>
        <button onClick={() => handleBtnClick()}>click</button>
      </main>
    </section>
  );
};

export default RecipesPage;
