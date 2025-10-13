import { User } from "../models/user.js";

export const createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Usuário e senha são obrigatórios" });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const newUser = await User.create({
      username,
      password,
      role: role || "user",
    });

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      user: newUser,
    });
  } catch (error) {
  console.error("❌ Erro ao criar usuário:", error);
  res.status(500).json({ message: "Erro ao criar usuário", error: error.message });
}

};
