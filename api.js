import express from "express";
import jwt from 'jsonwebtoken'

const app = express();
const PORT = 3000;
const SECRET_KEY = 'meusegredo';

app.use(express.json());

const users = [
    { id: 1, username: 'Enzo', password: 12345678, role: 'admin' },
    { id: 2, username: 'Peterson', password: 12345678, role: 'user' }
];

//Rota de autenticação e geração de token
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password)

    if(user) {
        const token = jwt.sign({id: user.id, username: user.username, role: user.role}, SECRET_KEY, {expiresIn: '1h'});
        res.status(201).json({message: token});

    } else {
        res.status(401).json({message:'Usuário ou senha inválidos!'});
    }
});

//middleware para autenticar o token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if(!token) return res.status(403).json({message:"Token não fornecido!"});

    jwt.verify(token, SECRET_KEY, (err, user) =>{
        if(err) return res.status(403).json({message:"Token inválido!"})
        req.user = user;
        next();
    });

};

//Rota autenticada
app.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({message:"Bem vindo à rota autenticada"})
})

//Rota privada admin
app.get('/admin', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({message:"Sem permissão para acessar esta pagina!"});
    res.status(200).json({message:"Bem vindo a pagina ADM!"})
})

const objRespose = { name: 'Enzo', company: 'Anchieta' };

app.get('/', (req, res) => {
    res.json(objRespose);
});

app.listen(PORT, () => console.log(`O servidor está rodadando na porta ${PORT}`));

//node --watch .\api.js

