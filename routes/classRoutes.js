import express from "express";
import { addClass, listClass } from "../controllers/classControllers.js";
import { authenticateToken, verifyAdmin } from "../middlewares/authMiddlewares.js";

const classRouter = express.Router();

/**
 * @swagger
 * /class:
 *   get:
 *     summary: Lista todos as aulas
 *     tags: [Aulas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de alunos retornada
 */
classRouter.get("/class", authenticateToken, listClass);

/**
 * @swagger
 * /class:
 *   post:
 *     summary: Adiciona uma nova aula
 *     tags: [Aulas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - timeSlot
 *               - teacher
 *               - subject
 *             properties:
 *               date:
 *                 type: dateonly
 *                 example: 2025-10-21
 *               timeSlot:
 *                 type: ENUM
 *                 example: 19:10 - 20:00
 *               teacher:
 *                 type: string
 *                 example: João da Silva
 *               subject:
 *                 type: string
 *                 example: Matemática
 *                  
 *     responses:
 *       200:
 *         description: Aula criada com sucesso!
 *       400:
 *         description: Já existe aula neste dia e horário.
 *       404:
 *         description: Professor ou disciplina não encontrados
 *       401:
 *         description: O professor (Nome do professor) não leciona a disciplina (Nome da disciplina). 
 */
classRouter.post("/class", authenticateToken, verifyAdmin, addClass);

export default classRouter;
