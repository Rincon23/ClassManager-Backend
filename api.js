// npm i para inicializar
import express from "express";
import cors from "cors";
//Rotas
import authRouter from "./routes/authRoutes.js";
import teacherRouter from "./routes/teacherRoutes.js";
import userRouter from "./routes/userRoutes.js";
//Banco de dados
import { db } from "./models/index.js";

const app = express();
const PORT = 3000;

//swagger
import { swaggerUi, swaggerSpec } from "./config/swagger.js";

//permitir que esses dominios façam requisições
app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:8080"]
}));

app.use(express.json());
app.use(authRouter);
app.use(teacherRouter);
app.use(userRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Conexão com o banco de dados estabelecida.");

    await db.sequelize.sync({ alter: true });
    console.log("✅ Models sincronizados com o banco.");

    app.listen(PORT, () => {
      console.log(`🚀 O servidor está rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erro ao conectar com o banco de dados:", error);
  }
}

startServer();

//node --watch .\api.js

