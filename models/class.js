// models/aula.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Teacher } from "./teacher.js";
import { Subject } from "./subject.js";

export const Class = sequelize.define("Class", {
  id: { type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true },

  date: { type: DataTypes.DATEONLY, 
    allowNull: false },

  timeSlot: {
    type: DataTypes.ENUM(
      "19:10 - 20:00",
      "20:00 - 20:50",
      "21:00 - 21:50",
      "21:50 - 22:40"
    ),
    allowNull: false,
  },

  teacher: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
