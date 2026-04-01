const {Pool} = require('pg')

const pool = new Pool({
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'postgres'
})


try{

    pool.connect()
    console.log('conectado com sucesso')

} catch(err) {console.log(err)}


// Seleciona todas as tasks
async function getTasks(){

    try{

        const response =await pool.query(
            'SELECT * FROM tasks'
        );

        console.log(response.rows)
        return response

    }catch(err){

        console.log(err)
    }
}

// Seleciona um id especifico
async function getTask(taskId){

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
}

// Atualiza uma task specifica
async function updateTasks(taskId){

    try{
        const response = await pool.query(
            'INSERT INTO tasks WHERE '
        )


    }catch(err){


    }

}



