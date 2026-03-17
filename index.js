const client = require('./database/connection')
const readLine = require('readline')
const express = require('express')
const cors = require('cors')

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
app.use(cors())

app.get('/api/tasks', async (req,res) =>{

    try{
        const result = await client.query(
            'SELECT * FROM tasks ORDER BY data_criacao DESC'
        )
        res.json(result.rows)
    }catch (err){
        res.status(500).json({ error: err.message})
    }


})


app.get('/', (req, res) => {
    res.send('API está rodando 🚀')
})

app.listen(3000, () => console.log('API rodando na porta 3000'));