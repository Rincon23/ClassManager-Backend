import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("framework2", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: false,
});
