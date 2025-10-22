import express from "express";
import { addSubject, listSubject, deleteSubject, patchSubject } from "../controllers/subjectController.js";
import { authenticateToken, verifyAdmin } from "../middlewares/authMiddlewares.js";

const subjectRouter = express.Router();

/**
 * @swagger
 * /subject:
 *   get:
 *     summary: Lista todas as disciplinas
 *     tags: [Disciplina]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de Disciplina retornada
 */
subjectRouter.get("/subject", authenticateToken, listSubject);

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
 *                 example: Matemática
 *     responses:
 *       201:
 *         description: Diciplina criada com sucesso
 *       400:
 *          description: Disciplina já existe
 *       403:
 *         description: Sem permissão (somente admin)
 */
subjectRouter.post("/subject", authenticateToken, verifyAdmin, addSubject);

/**
 * @swagger
 * /subject:
 *   delete:
 *     summary: Deleta uma disciplina pelo nome
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
 *                 example: Matemática
 *     responses:
 *       200:
 *         description: Disciplina deletada
 *       404:
 *         description: Disciplina não existe
 */
subjectRouter.delete("/subject", authenticateToken, verifyAdmin, deleteSubject);

/**
 * @swagger
 * /subject:
 *   patch:
 *     summary: Altera uma disciplina pelo nome
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
 *               - oldName
 *               - newName
 *             properties:
 *               oldName:
 *                 type: string
 *                 example: Matemática
 *               newName:
 *                 type: string
 *                 example: Português
 *     responses:
 *       200:
 *         description: Disciplina alterada
 *       404:
 *         description: Disciplina não existe
 *       400:
 *         description: Nome da disciplina já está em uso
 */
subjectRouter.patch("/subject", authenticateToken, verifyAdmin, patchSubject);




export default subjectRouter;