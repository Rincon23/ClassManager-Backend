import express from "express";
const router = express.Router();
import {adminRoute, login, protectedRoute, testRoute} from "../controllers/authControllers.js"
import { authenticateToken } from "../middlewares/authMiddlewares.js";

router.post("/login", login);

router.get("/protected",authenticateToken, protectedRoute)

router.get("/admin", authenticateToken, adminRoute)

router.get('/', testRoute)

export default router;