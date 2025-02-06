import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";

import recipeRoutes from "./routes/recipes";
//import ingredientRoutes from "./routes/ingredients";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/img", express.static(path.join(__dirname, "img")));

// Routes
app.use("/api/recipes", recipeRoutes);
//app.use("/api/ingredients", ingredientRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur l'API de smartfridge");
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});