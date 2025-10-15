import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/auth.js";

export const authenticateToken = (req, res, next) => {
  let token = req.headers["authorization"]; // ← aqui é let

  if (!token) {
    return res.status(403).json({ message: "Token não fornecido!" });
  }

  // Remove "Bearer " no swagger
  token = token.replace(/^Bearer\s+/i, "").trim().replace(/^"|"$/g, "");

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido!" });
    }
    req.user = user;
    next();
  });
};

export const verifyAdmin = (req,res,next) => {
    if (req.user.role !== 'admin') return res.status(403).json({message:"Sem permissão para acessar esta pagina!"});
    next();
}