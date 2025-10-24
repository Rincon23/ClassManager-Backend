import { Class } from "../models/class.js";
import { Teacher } from "../models/teacher.js";
import { Subject } from "../models/subject.js";

export const listClass = async (req, res) => {
  try {
    const Classes = await Class.findAll();
    res.status(200).json(Classes);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar aulas", error });
  }
};

export const addClass = async (req, res) => {
  try {
    const {date , timeSlot, teacher, subject} = req.body;

    //Verifica se existe uma aula com a mesma data e horário
    const existingDateTimeSlot = await Class.findOne({ where: { date, timeSlot } });
    if (existingDateTimeSlot) {
      return res.status(400).json({ message: "Já existe aula neste dia e horário." });
    }

    // Busca o professor e a disciplina
    const teachersFound = await Teacher.findAll({ where: { name: teacher } });
    const subjectFound = await Subject.findOne({ where: { name: subject } });

    if (!teachersFound.length || !subjectFound) {
      return res.status(404).json({ message: "Professor ou disciplina não encontrados." });
    }


    // Verifica se o professor leciona a disciplina
    const matchingTeacher = teachersFound.find(t => t.subject === subjectFound.name);
    if (!matchingTeacher) {
        return res.status(400).json({ message: `O professor ${teacher} não leciona a disciplina ${subjectFound.name}.`,
        });
    }

    //Cria nova aula
    const addclass = await Class.create({date, timeSlot, teacher: matchingTeacher.name, subject: subjectFound.name,});
    res.status(201).json(addclass); 

    } catch (error) {
    console.error("❌ Erro detalhado ao criar aula:", error);
    res.status(500).json({
    message: "Erro ao criar aula",
    error: error.message || error,
  });
}
}

export const deleteClass = async (req, res) => {
  try {
    const {date , timeSlot} = req.body;

    //Veriifiica se existe alguma aula marcada para esta data
    const classFound = await Class.findOne({ where: { date, timeSlot } });

    if (!classFound) {
      return res.status(404).json({ message: "Data não está prevista para ter aula!" });
    }

    await Class.destroy({ where: { date, timeSlot } });
    res.status(200).json({ message: "Aula foi removida!" });
  } catch (error) {
      console.error("❌ Erro ao deletar Aula:", error);
      res.status(500).json({ message: "Erro ao deletar Aula", error: error.message });
  }
}

export const patchClass = async (req, res) => {
  try {
    const { oldDate, oldTimeSlot, newDate, newTimeSlot, teacher, subject } = req.body;

    //Verifica se existe a data antiga
    const oldClassFound = await Class.findOne({ where: { date:oldDate, timeSlot:oldTimeSlot } });
    if (!oldClassFound) {
      return res.status(404).json({ message: "Data e hora que está tentando alterar não está prevista para ter aula!" });
    }

    //Verifica se a data nova está em uso a data
    const oldClassInUse = await Class.findOne({ where: { date:newDate, timeSlot:newTimeSlot } });
    if (oldClassInUse) {
      return res.status(400).json({ message: "Data e hora já está em uso!" });
    }

    await Class.update(
      {date: newName, timeSlot: newTimeSlot, teacher, subject},
      {where: { id: oldClassFound.id }}
    );
    res.status(200).json({ message: "Aula foi alterada!" });
  } catch (error) {
      console.error("❌ Erro ao alterar disciplina:", error);
      res.status(500).json({ message: "Erro ao alterar disciplina", error: error.message });
  }
}