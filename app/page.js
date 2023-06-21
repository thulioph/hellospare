"use client";

import React from "react";

import { getIngredientsList, getRecipesSuggestions } from "@/services";
import { _formatIngredients, _formatRecipe } from "@/utils";

const HomePage = () => {
  const [recipe, setRecipe] = React.useState();
  const [allIngredients, setAllIngredients] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingMsg, setLoadingMsg] = React.useState(null);

  const handleTryAgain = () => {
    setRecipe(null);
    setAllIngredients(null);
    setIsLoading(false);
    setLoadingMsg(null);

    handleHFConnect();
  };

  const handleHFConnect = async () => {
    setIsLoading(true);
    setLoadingMsg("Getting items from your HF box...");

    // [1] - Get HF data
    const { data: ingredients } = await getIngredientsList();
    setAllIngredients(ingredients);

    // [2] - Ask chatgpt recommendations
    const formattedIngredients = _formatIngredients(ingredients);

    if (formattedIngredients) {
      setLoadingMsg("Looking for recipe suggestions...");

      const recipeSuggestion = await getRecipesSuggestions(
        formattedIngredients
      );

      const formattedRecipe = _formatRecipe(recipeSuggestion);

      setRecipe(formattedRecipe);

      setIsLoading(false);
      setLoadingMsg(null);
    }

    setIsLoading(false);
    setLoadingMsg(null);
  };

  return (
    <React.Fragment>
      <section className="connect-account">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-300 sm:text-6xl">
            HelloSpare
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Discover the art of transforming humble spare items from your
            HelloFresh, box into extraordinary culinary creations 🥘
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              disabled={recipe}
              onClick={() => handleHFConnect()}
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Connect your HelloFresh account
            </button>

            <button onClick={() => handleTryAgain()}>Try again</button>
          </div>
        </div>
      </section>

      <section className="my-32 px-5 py-4">
        {isLoading && <h1>{loadingMsg}</h1>}
        {!isLoading && <code>{JSON.stringify(recipe, null, 2)}</code>}
      </section>
    </React.Fragment>
  );
};

export default HomePage;
