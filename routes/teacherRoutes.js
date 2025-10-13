import express from "express";
import { listTeacher, addTeacher } from "../controllers/teacherControllers.js";
import { authenticateToken, verifyAdmin } from "../middlewares/authMiddlewares.js";

const teacherRouter = express.Router();

teacherRouter.get("/teachers", authenticateToken, listTeacher);
teacherRouter.post("/teachers", authenticateToken, verifyAdmin, addTeacher);

export default teacherRouter;
