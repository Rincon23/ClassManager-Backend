import express from "express";
const router = express.Router();
import {adminRoute, protectedRoute, testRoute} from "../controllers/authControllers.js"
import { authenticateToken, verifyAdmin } from "../middlewares/authMiddlewares.js";

router.get("/protected",authenticateToken, protectedRoute)

router.get("/admin", authenticateToken, verifyAdmin, adminRoute)

router.get('/', testRoute)

export default router;