const pool = require('../config/db');

const taskModel = {

    getTasks: async () => {
            console.log('coletando tasks...')
        try{

            const response =await pool.query(
                'SELECT * FROM tasks'
            );

            console.log(response.rows)
            return response.rows;

        }catch(err){

            console.log(err)
        }
    },


    getTask: async (taskId) => {
        // Seleciona uma taks de id especifico
        
        try{
            const response = await pool.query(
                'SELECT * FROM tasks WHERE id = $1',
                [taskId]
            );

            console.log(response.rows)
            return response

        }catch(err){
            console.log(err)
        }
    },


    updateTask: async (taskId,coluna='titulo',conteudo='',status='') => {
        // Atualiza uma task specifica
        const colunasPermitidas = ['titulo','descricao','status'];

        if(!colunasPermitidas.includes(coluna)){
            console.log('Coluna não autorizada');
            return;
        }
        let query = `UPDATE tasks SET ${coluna} = $1 WHERE id = $2`
        let values = [conteudo,taskId]

        if(status){
            query = `UPDATE tasks SET status = $1, ${coluna} = $2 WHERE id = $3`
            values = [status,conteudo,taskId];
        }
        
        try{

            const response = await pool.query(query,values)

            console.log('alterado com sucesso', response)

        }catch(err){
            console.log('erro ao tentar atualizar banco de dados', err);

        }

    },

    createTask: async (titulo,descricao) => {
        // Cria uma task com status padrão todo
        try{
            const response = await pool.query(
                'INSERT INTO tasks (titulo,descricao,status) VALUES ($1,$2,$3)',
                [titulo,descricao,'todo']
            )

            console.log('Task criada com sucesso');
        }catch(err){
            console.log(`Erro ao tentar criar tarefa ${err}`);
        }
        
    },

    deleteTask: async (taskId) =>{
        
        try{
            const response = await pool.query(
                'DELETE FROM tasks WHERE id = $1',
                [taskId]
            )
            console.log('Tarefa deletada com sucesso');
        }catch(err){
            console.log(`Erro ao deletar task ${err}`);
        }
    }


}


module.exports = taskModel;












