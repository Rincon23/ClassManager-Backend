import { Teacher } from "../models/teacher.js";

export const listTeacher = async (req, res) => {
  try {
    const teachers = await Teacher.findAll();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar professores", error });
  }
};

export const addTeacher = async (req, res) => {
  try {
    const addteacher = await Teacher.create(req.body);
    res.status(201).json(addteacher);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar professor", error });
  }
};
