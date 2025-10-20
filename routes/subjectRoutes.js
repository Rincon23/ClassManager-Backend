import express from "express";
import { addSubject } from "../controllers/subjectController.js";
import { authenticateToken, verifyAdmin } from "../middlewares/authMiddlewares.js";

const subjectRouter = express.Router();

/**
 * @swagger
 * /subject:
 *   post:
 *     summary: Adiciona uma nova diciplina
 *     tags: [Disciplina]
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Português
 *     responses:
 *       201:
 *         description: Diciplina criada com sucesso
 *       400:
 *          description: Disciplina já existe
 *       403:
 *         description: Sem permissão (somente admin)
 */
subjectRouter.post("/subject", authenticateToken, verifyAdmin, addSubject);

export default subjectRouter;