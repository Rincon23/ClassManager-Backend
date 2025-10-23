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

export const deleteTeacher = async (req, res) => {
  try {
    const {name} = req.body;
    const existingTeacher = await Teacher.findOne({ where: { name } });
    if (!existingTeacher) {
      return res.status(404).json({ message: "Professor não existe" });
    }

    await Teacher.destroy({ where: { name } });
    res.status(200).json({ message: "Professor foi removido!" });
  } catch (error) {
      console.error("❌ Erro ao deletar professor:", error);
      res.status(500).json({ message: "Erro ao deletar professor", error: error.message });
  }
}

export const patchTeacher = async (req, res) => {
  try {
    const {oldName, newName} = req.body;

    //Verifica se existe nome 
    const existingTeacher = await Teacher.findOne({ where: { name: oldName } });
    if (!existingTeacher) {
      return res.status(404).json({ message: "Professor não existe" });
    }

    //Verifica se o novo nome já está em uso
    const inUse = await Teacher.findOne({ where: { name: newName } });
    if (inUse) {
      return res.status(400).json({ message: "Professor já está em uso!" });
    }

    await Teacher.update(
      {name: newName,},
      {where: {name:oldName}}                   
    );
    res.status(200).json({ message: "Professor foi alterada!" });
  } catch (error) {
      console.error("❌ Erro ao alterar professor:", error);
      res.status(500).json({ message: "Erro ao alterar professor", error: error.message });
  }
}