const express = require('express')

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


app.get('/task/:id', async (req,res) =>{

    const taskId = req.params.id
    console.log(taskId)
    try{
        const result = await client.query(
            'SELECT * FROM tasks WHERE id = $1',
            [taskId]
        )
        res.json(result.rows[0]);

    }
    catch(err){
        res.status(500).send("Erro ao tentar obter task")
    }

})

app.put('/task/:id', async (req, res) => {

    const id = req.params.id;
    console.log(req.body.status)
    const status = req.body.status ? req.body.status : "todo";
    console.log(status)
    const titulo = req.body.title;
    const description = req.body.desc; 
    
    if(! titulo || !description){
        try {
        const result = await client.query(
            'UPDATE tasks SET status = $1 WHERE id = $2',
            [status, id]
        );

        res.status(200).json({ message: "Atualizado com sucesso!", id, status });

        } catch (err) {
            console.error("Erro no Banco:", err);
            res.status(500).json({ error: "Erro ao realizar atualização no banco de dados" });
        }
            return;
    }

        try {
        const result = await client.query(
            'UPDATE tasks SET status = $1, titulo = $2, descricao = $3 WHERE id = $4',
            [status, titulo, description, id]
        );

        res.status(200).json({ message: "Atualizado com sucesso!", id, status });

        } catch (err) {
            console.error("Erro no Banco:", err);
            res.status(500).json({ error: "Erro ao realizar atualização no banco de dados" });
        }
            return;

    
});

app.post('/task', async (req, res) => {

    console.log("CHAMANDO POST")
    const taskTitle = req.body.title;
    const taskDesc =  req.body.desc;
    const status = req.body.status;

    try{
        const result = await client.query(
            'INSERT INTO tasks (descricao, titulo, status) VALUES ($1,$2,$3) RETURNING *',
            [taskDesc,taskTitle,status]
        )

        res.status(200).send(result);
    }
    catch(err){
        res.status(500).send("Erro ao criar dados");
    }
})

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

