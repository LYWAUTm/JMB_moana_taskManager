
import express from "express";
import { create, list } from "../controller/taskController.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(auth)

router.post("/create", create);
router.get("/", list);

export default router;