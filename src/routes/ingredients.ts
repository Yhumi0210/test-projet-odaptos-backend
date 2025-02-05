import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const dataPath = path.join(__dirname, "../data/recipes.json");

const readData = () => {
    const data = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(data);
};

router.get("/", (req: Request, res: Response) => {
    const data = readData();
    res.json(data.ingredients);
});

export default router;
