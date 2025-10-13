import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/auth.js";
import { User } from "../models/user.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // busca o usuário no banco
    const user = await User.findOne({ where: { username } });

    // verifica se achou e se a senha confere
    if (user && user.password === password) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Usuário ou senha inválidos!" });
    }
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro no login", error: error.message });
  }
};
