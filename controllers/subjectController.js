import { Subject } from "../models/subject.js";

export const addSubject = async (req, res) => {
  try {
    const { name } = req.body;
    
    const existingSubject = await Subject.findOne({ where: { name } });
   if (existingSubject) {
      return res.status(400).json({ message: "Disciplina já existe" });
    }
    
    const addSubject = await Subject.create(req.body);
    res.status(201).json(addSubject);
    
  } catch (error) {
  console.error("❌ Erro ao criar disciplina:", error);
  res.status(500).json({ message: "Erro ao criar disciplina", error: error.message });
}

};

export const listSubject = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
      res.status(200).json(subjects);

  } catch (error) {
      console.error("❌ Erro ao listar disciplina:", error);
      res.status(500).json({ message: "Erro ao listar disciplina:", error: error.message });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const {name} = req.body;
    const existingSubject = await Subject.findOne({ where: { name } });
    if (!existingSubject) {
      return res.status(404).json({ message: "Disciplina não existe" });
    }

    await Subject.destroy({ where: { name } });
    res.status(200).json({ message: "Disciplina foi removida!" });
  } catch (error) {
      console.error("❌ Erro ao deletar disciplina:", error);
      res.status(500).json({ message: "Erro ao deletar disciplina", error: error.message });
  }
}

export const patchSubject = async (req, res) => {
  try {
    const {oldName, newName} = req.body;

    //Verifica se existe nome 
    const existingSubject = await Subject.findOne({ where: { name: oldName } });
    if (!existingSubject) {
      return res.status(404).json({ message: "Disciplina não existe" });
    }

    //Verifica se o novo nome já está em uso
    const inUse = await Subject.findOne({ where: { name: newName } });
    if (inUse) {
      return res.status(400).json({ message: "Disciplina já está em uso!" });
    }

    await Subject.update(
      {name: newName,},
      {where: {name:oldName}}                   
    );
    res.status(200).json({ message: "Disciplina foi alterada!" });
  } catch (error) {
      console.error("❌ Erro ao alterar disciplina:", error);
      res.status(500).json({ message: "Erro ao alterar disciplina", error: error.message });
  }
}

