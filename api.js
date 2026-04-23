// npm i para inicializar
import express from "express";
import cors from "cors";
//Rotas
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import subjectRouter from "./routes/subjectRoutes.js";
import teacherRouter from "./routes/teacherRoutes.js";
import classRouter from "./routes/classRoutes.js";

//Banco de dados
import { db } from "./models/index.js";

const app = express();
const PORT = 3000;

//swagger
import { swaggerUi, swaggerSpec } from "./config/swagger.js";

//permitir que esses dominios façam requisições
app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:8080", "http://localhost:3001", process.env.NEXT_PUBLIC_API_URL]
}));

app.use(express.json());
app.use(userRouter);
app.use(authRouter);
app.use(subjectRouter);
app.use(teacherRouter);
app.use(classRouter);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Conexão com o banco de dados estabelecida.");

    await db.sequelize.sync();
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

