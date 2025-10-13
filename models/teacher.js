import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Teacher = sequelize.define("Teacher", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  disciplina: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  });
