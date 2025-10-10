import jwt from "jsonwebtoken";
import { users, objTest } from "../models/user.js";
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

export const protectedRoute = (req, res) => {
    res.status(200).json({message:"Bem vindo à rota autenticada"})
}

export const adminRoute = (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({message:"Sem permissão para acessar esta pagina!"});
    res.status(200).json({message:"Bem vindo a pagina ADM!"})
}

export const testRoute = (req, res) => {
    res.json(objTest);
};