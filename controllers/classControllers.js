import { Class } from "../models/class.js";
import { Teacher } from "../models/teacher.js";
import { Subject } from "../models/subject.js";

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

export const listClass = async (req, res) => {
  try {
    const Classes = await Class.findAll();
    res.status(200).json(Classes);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar aulas", error });
  }
};