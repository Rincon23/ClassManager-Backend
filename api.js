import express from "express";

const app = express();
const PORT = 3000;
const objRespose = { name: 'Enzo', company: 'Anchieta' }

app.get('/', (req, res) => {
    res.json(objRespose)
})

app.listen(PORT, () => console.log(`O servidor está rodadndo na porta ${PORT}`))

//node --watch .\api.js

