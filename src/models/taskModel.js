const pool = require('../config/db');

const taskModel = {

    getTasks: async () => {

        try{

            const response =await pool.query(
                'SELECT * FROM tasks'
            );

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


    updateTask: async (taskId,coluna='titulo',conteudo='#',) => {
        // Atualiza uma task specifica
        const colunasPermitidas = ['titulo','descricao'];

        if(!colunasPermitidas.includes(coluna)){
            console.log('Coluna não autorizada');
            return;
        }

        const query = `UPDATE tasks SET ${coluna} = $1 WHERE id = $2`
        const values = [conteudo,taskId]
        
        try{

            const response = await pool.query(query,values)

            console.log('alterado com sucesso', response)

        }catch(err){
            console.log('erro ao tentar atualizar banco de dados', err);

        }

    },

    updateStatusTask: async (taskId, status) => {

        try{
            const response = await pool.query(
                'UPDATE tasks SET status = $1 WHERE id = $2',
                [status,taskId]
            )
            console.log('Status atualizado com sucesso');
        } catch(err){
            console.log('Erro ao atualizar status');
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












