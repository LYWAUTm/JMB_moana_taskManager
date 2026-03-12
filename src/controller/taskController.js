import { createTask, getAllTasks } from "../models/taskModel.js";

export const create = async (req, res) => {
    const { title, description, done } = req.body;
    const user_id = req.user.id; // récupéré via JWT

    if (!title) {
        return res.status(400).json({ message: "Le titre est obligatoire" });
    }

    try {
        const task = await createTask({ user_id, title, description, done });
        return res.status(201).json(task);

    } catch (err) {
        return res.status(500).json({ error: "Erreur serveur" });
    }
};

export const list = async (req, res) => {
    const user_id = req.user.id;

    try {
        const tasks = await getAllTasks(user_id);
        return res.json(tasks);

    } catch (err) {
        return res.status(500).json({ error: "Erreur serveur" });
    }
};

