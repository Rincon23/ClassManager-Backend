import express from "express";
import { listTeacher, addTeacher, deleteTeacher, patchTeacher } from "../controllers/teacherControllers.js";
import { authenticateToken, verifyAdmin } from "../middlewares/authMiddlewares.js";

const teacherRouter = express.Router();

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Lista todos os professores
 *     tags: [Professor]
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
 *     tags: [Professor]
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

/**
 * @swagger
 * /teachers:
 *   delete:
 *     summary: Deleta uma professor pelo nome
 *     tags: [Professor]
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
 *                 example: João da Silva
 *     responses:
 *       200:
 *         description: Professor deletado
 *       404:
 *         description: Professor não existe
 */
teacherRouter.delete("/teachers", authenticateToken, verifyAdmin, deleteTeacher);

/**
 * @swagger
 * /teachers:
 *   patch:
 *     summary: Altera um professor pelo nome
 *     tags: [Professor]
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
 *                 example: João da Silva
 *               newName:
 *                 type: string
 *                 example: João Bezerra
 *     responses:
 *       200:
 *         description: Professor alterado
 *       404:
 *         description: Professor não existe
 *       400:
 *         description: Nome do professor já está em uso
 */
teacherRouter.patch("/teachers", authenticateToken, verifyAdmin, patchTeacher);

export default teacherRouter;
