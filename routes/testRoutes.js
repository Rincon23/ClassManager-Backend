import express from "express";
const testRouter = express.Router();
import {adminRoute, protectedRoute, testRoute} from "../controllers/testControllers.js"
import { authenticateToken, verifyAdmin } from "../middlewares/authMiddlewares.js";

testRouter.get("/protected",authenticateToken, protectedRoute)

testRouter.get("/admin", authenticateToken, verifyAdmin, adminRoute)

testRouter.get('/', testRoute)

export default testRouter;