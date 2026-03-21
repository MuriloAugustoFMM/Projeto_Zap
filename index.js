const client = require('./database/connection')
const readLine = require('readline')
const express = require('express')
const cors = require('cors')
const path = require('path')

let index = 0

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
})

rl.on('line', async (message) =>{
    if(message == 'task'){
        const result = await createTask()
        console.log(result.rows[0])
    }
})

async function createTask(){


    const result = await client.query(
        'INSERT INTO tasks (text) VALUES ($1) RETURNING *',
        [index]
    )
    index++;

    return result
}



const app = express();
app.use(express.static('public'))
app.use(express.json())


app.use((req,res,next) =>{
    console.log(`Método: ${req.method}, rota: ${req.url}`);
    next();

})

app.get('/api/tasks', async (req,res) =>{

    try{
        const result = await client.query(
            'SELECT * FROM tasks'
        )
        res.json(result.rows)
        
    }catch (err){
        res.status(500).json({ error: err.message})
    }


})


app.get('/', (req, res) => {
    

    
    res.send('API está rodando 🚀')
})

app.put('/task/:id', async (req, res) => {

    const id = req.params.id;
    const status = req.body.status

    try {
        const result = await client.query(
            'UPDATE tasks SET status = $1 WHERE id = $2',
            [status, id]
        );

        // --- O QUE FALTOU: ENVIAR A RESPOSTA ---
        // Sem isso, o fetch no frontend fica esperando para sempre (ou dá 404/timeout)
        res.status(200).json({ message: "Atualizado com sucesso!", id, status });

    } catch (err) {
        console.error("Erro no Banco:", err);
        res.status(500).json({ error: "Erro ao realizar atualização no banco de dados" });
    }
});

app.delete('/task/:id', async (req,res) => {
    
    const taskId = req.params.id;

    try{
        const response = await client.query(
            'DELETE FROM tasks WHERE id = $1',
            [taskId]
        )

        res.status(204).send('OK');
    }
    catch(err){
        res.status(500).send('falha no servidor')
    }
})


app.listen(3000, () => console.log('API rodando na porta 3000'));

