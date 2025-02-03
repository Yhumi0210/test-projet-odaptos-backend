import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const dataPath = path.join(__dirname, "../data/mockData.json");

const readData = () => {
    const datas = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(datas);
};

router.get("/", (req: Request, res: Response) => {
    const data = readData();
    res.json(data.users);
});

router.get("/:id", (req: Request, res: Response) => {
    const data = readData();
    const user = data.users.find((u: any) => u.id === parseInt(req.params.id));

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "Utilisateur non trouvé" });
    }
});

// POST /api/users - Ajouter un nouvel utilisateur plus tard avec une DB
router.post("/", (req: Request, res: Response) => {
    const data = readData();
    const newUser = {
        id: data.users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    data.users.push(newUser);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    res.status(201).json(newUser);
});

export default router;
