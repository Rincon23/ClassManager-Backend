import { sequelize } from "../config/database.js";
import { Teacher } from "./teacher.js";
import { User } from "./user.js";

export const db = {
  sequelize,
  Teacher,
  User,
};