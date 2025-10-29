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
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Email ou senha inválidos
 */
authRouter.post("/login", login);

export default authRouter;