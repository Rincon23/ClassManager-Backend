import jwt from "jsonwebtoken";
import { users } from "../models/user.js";
import { SECRET_KEY } from "../config/auth.js";


export const login = (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password)

    if (user) {
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.status(201).json({ message: token });

    } else {
        res.status(401).json({ message: 'Usuário ou senha inválidos!' });
    }
}