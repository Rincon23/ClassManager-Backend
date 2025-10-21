import express from "express";
import { listTeacher, addTeacher } from "../controllers/teacherControllers.js";
import { authenticateToken, verifyAdmin } from "../middlewares/authMiddlewares.js";

const teacherRouter = express.Router();

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Lista todos os professores
 *     tags: [Professores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de professores retornada
 */
teacherRouter.get("/teachers", authenticateToken, listTeacher);

/**
 * @swagger
 * /teachers:
 *   post:
 *     summary: Adiciona um novo professor
 *     tags: [Professores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - subject
 *             properties:
 *               name:
 *                 type: string
 *                 example: João da Silva
 *               subject:
 *                 type: string
 *                 example: Matemática
 *     responses:
 *       201:
 *         description: Professor criado com sucesso
 *       403:
 *         description: Sem permissão (somente admin)
 *       400:
 *          description: Não existe essa disciplina
 */
teacherRouter.post("/teachers", authenticateToken, verifyAdmin, addTeacher);

export default teacherRouter;
