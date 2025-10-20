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
  console.error("❌ Erro ao criar usuário:", error);
  res.status(500).json({ message: "Erro ao criar usuário", error: error.message });
}

};