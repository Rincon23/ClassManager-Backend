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
 *       403:
 *         description: Token inválido ou ausente
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
 *               - nome
 *               - disciplina
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João da Silva
 *               disciplina:
 *                 type: string
 *                 example: Matemática
 *               email:
 *                 type: string
 *                 example: joao@escola.com
 *     responses:
 *       201:
 *         description: Professor criado com sucesso
 *       403:
 *         description: Sem permissão (somente admin)
 */
teacherRouter.post("/teachers", authenticateToken, verifyAdmin, addTeacher);

export default teacherRouter;
