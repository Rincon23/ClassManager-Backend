import express from "express";
const authRouter = express.Router();
import { login } from "../controllers/authControllers.js"

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login de um usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: Enzo
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Usuário ou senha inválidos
 */
authRouter.post("/login", login);

export default authRouter;