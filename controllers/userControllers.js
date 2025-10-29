import { User } from "../models/user.js";

export const createUser = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "Email, usuário e senha são obrigatórios" });
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(409).json({ message: "Email já existe" });
    }

    const newUser = await User.create({
      email,
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
