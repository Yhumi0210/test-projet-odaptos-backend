import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const dataPath = path.join(__dirname, "../data/recipes.json");

const readData = () => {
  const datas = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(datas);
};

const writeData = (data: any) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
};

// GET
router.get("/", (req: Request, res: Response) => {
  const data = readData();
  res.json(data.recipes);
});

router.get("/:id", (req: Request, res: Response) => {
  const data = readData();
  const recipe = data.recipes.find((r: any) => r.id === Number(req.params.id));
  if (recipe) {
      res.json(recipe);
  } else {
      res.status(404).json({ message: "La recette n'existe pas" });
  }
});

// POST
router.post("/", (req: Request, res: Response) => {
  const data = readData();
  const newRecipe = req.body;
  newRecipe.id = data.recipes.length > 0 ? data.recipes[data.recipes.length - 1].id + 1 : 1;
  data.recipes.push(newRecipe);
  writeData(data);
  res.status(201).json(newRecipe);
});

// DELETE
router.delete("/:id", (req: Request, res: Response) => {
  const data = readData();
  const recipeId = Number(req.params.id); // ✅ Conversion en nombre
  if (isNaN(recipeId)) {
    res.status(400).json({ message: "ID invalide" });
    return;
  }

  const newRecipes = data.recipes.filter((r: any) => r.id !== recipeId);
  if (newRecipes.length === data.recipes.length) {
    res.status(404).json({ message: "La recette n'existe pas" });
    return;
  }

  data.recipes = newRecipes;
  writeData(data);
  res.json({ message: "Recette supprimée avec succès" });
});

export default router;