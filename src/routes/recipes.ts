import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const dataPath = path.join(__dirname, "../data/recipes.json");

const readData = () => {
  const datas = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(datas);
};

router.get("/", (req: Request, res: Response) => {
  const data = readData();
  res.json(data.recipes);
});

router.get("/:id", (req: Request, res: Response) => {
  const data = readData();
  const recipe = data.recipes.find((r: any) => r.id === req.params.id);
  if (recipe) {
      res.json(recipe);
  } else {
      res.status(404).json({ message: "La recette n'existe pas" });
  }
});

export default router;