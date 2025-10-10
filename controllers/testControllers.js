export const protectedRoute = (req, res) => {
    res.status(200).json({message:"Bem vindo à rota autenticada"})
}

export const adminRoute = (req, res) => {
    res.status(200).json({message:"Bem vindo a pagina ADM!"})
}

export const testRoute = (req, res) => {
    res.status(200).json(objTest);
};