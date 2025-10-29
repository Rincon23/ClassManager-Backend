import express from "express";
import { createUser } from "../controllers/userControllers.js";

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: admin
 *               role:
 *                 type: string
 *                 example: admin
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Email, usuário e senha são obrigatórios
 *       409:
 *         description: Email já existe
 */
userRouter.post("/users", createUser);

export default userRouter;
