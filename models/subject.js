import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Subject = sequelize.define("Subject", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  });
