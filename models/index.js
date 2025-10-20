import { sequelize } from "../config/database.js";
import { User } from "./user.js";
import { Subject } from "./subject.js";
import { Teacher } from "./teacher.js";

export const db = {
  sequelize,
  User,
  Subject,
  Teacher,
};