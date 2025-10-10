import express from "express";
import router from "./routes/authRoutes.js";
import testRouter from "./routes/testRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(router);
app.use(testRouter);


app.listen(PORT, () => console.log(`O servidor está rodadando na porta ${PORT}`));

//node --watch .\api.js

