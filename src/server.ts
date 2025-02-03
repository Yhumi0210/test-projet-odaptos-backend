import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import recipeRoutes from "./routes/recipes";
import ingredientRoutes from "./routes/ingredients";
import userRoutes from "./routes/users";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/img", express.static(path.join(__dirname, "img")));

// Routes
app.use("/api/recipes", recipeRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur l'API de smartfridge");
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});