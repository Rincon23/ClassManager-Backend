import { Teacher } from "../models/teacher.js";
import { Subject } from "../models/subject.js";

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

    const { subject } = req.body;
    if (subject) {
      const existSubject = await Subject.findOne({ where: { name:subject } });
      if (!existSubject) {
        return res.status(400).json({ message: "Não existe essa disciplina!" });
      }
    }
    const addteacher = await Teacher.create(req.body);
    res.status(201).json(addteacher);

  } catch (error) {
    res.status(500).json({ message: "Erro ao criar professor", error });
  }
};
