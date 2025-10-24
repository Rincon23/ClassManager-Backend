import express from "express";
import { addClass, listClass, deleteClass, patchClass } from "../controllers/classControllers.js";
import { authenticateToken, verifyAdmin } from "../middlewares/authMiddlewares.js";

const classRouter = express.Router();

/**
 * @swagger
 * /class:
 *   get:
 *     summary: Lista todos as aulas
 *     tags: [Aula]
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
 *     tags: [Aula]
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

/**
 * @swagger
 * /class:
 *   delete:
 *     summary: Deleta uma aula pela data e o timeSlot
 *     tags: [Aula]
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
 *             properties:
 *               date:
 *                 type: dateonly
 *                 example: 2025-10-21
 *               timeSlot:
 *                 type: ENUM
 *                 example: 19:10 - 20:00
 *     responses:
 *       200:
 *         description: Aula foi removida
 *       404:
 *         description: Data não está prevista para ter aula
 */
classRouter.delete("/class", authenticateToken, verifyAdmin, deleteClass);

/**
 * @swagger
 * /class:
 *   patch:
 *     summary: Altera uma Aula pela data e o timeSlot
 *     tags: [Aula]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldDate
 *               - oldTimeSlot
 *               - newDate
 *               - newTimeSlot
 *               - teacher
 *               - subject
 *             properties:
 *               oldDate:
 *                 type: dateonly
 *                 example: 2025-10-21
 *               oldTimeSlot:
 *                 type: ENUM
 *                 example: 19:10 - 20:00
 *               newDate:
 *                 type: dateonly
 *                 example: 2025-10-22
 *               newTimeSlot:
 *                 type: ENUM
 *                 example: 20:00 - 20:50
 *     responses:
 *       200:
 *         description: Aula foi alterada
 *       404:
 *         description: Data e hora que está tentando alterar não está prevista para ter aula
 *       400:
 *         description: Data e hora já está em uso
 */
classRouter.patch("/class", authenticateToken, verifyAdmin, patchClass);


export default classRouter;
