import puppeteer from "puppeteer";

const HF_PAGE =
  "https://www.hellofresh.de/recipes/cremiges-risotto-mit-champignons-5e5677560c26ce4548185568";

// const HF_PAGE =
//   "https://www.hellofresh.de/recipes/knuspriger-flammkuchen-mit-mozzarella-62da9cebee0df13019068e09";

// const HF_PAGE = "https://www.hellofresh.de/recipes/sandwich-mit-aubergine-guacamole-5ceea59647a05b001611d8b6";

// const HF_PAGE = "https://www.hellofresh.de/recipes/boulette-mit-apfel-speck-sosze-6450bdafadd2e3ee840e8557";

const getHFIngredients = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto(HF_PAGE, {
    waitUntil: "domcontentloaded",
  });

  // get ingredients
  const ingredients = await page.evaluate(() => {
    const allIngredients = [];

    const list = document.querySelectorAll(
      '[data-test-id="ingredient-item-shipped"]'
    );

    list.forEach((element) => {
      const paragraphs = element.querySelectorAll("p[type='body-sm-regular']");

      const qtd = paragraphs[0].innerText;
      const product = paragraphs[1].innerText;

      allIngredients.push({ product, qtd });
    });

    return allIngredients;
  });

  // Close the browser
  await browser.close();

  // return items
  return ingredients;
  // return _formatItems(ingredients);
};

export default getHFIngredients;
