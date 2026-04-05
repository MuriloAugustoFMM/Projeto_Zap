const API_URL = 'http://localhost:3000/api/tasks';

export const taskService ={

    getTasks: async () => {

    try{
        const response = await fetch(API_URL);
        const tasks = await response.json();
        
        return tasks
    } catch(err){
        console.log('erro ao renderizar tasks');
    }
    
},

    getTask: async (taskId) => {
        try{
            const response = await fetch(`${API_URL}/${taskId}`)
            const task = response.json;
            return task;

        } catch(err){
            console.log(err);
        }
        
    },

    updateTask: async (taskId,campo,conteudo) => {

        try{

            const response = await fetch(`${API_URL}/${taskId}`, {
                method: 'put',
                headers: {'Content-type' : 'application/json'},

                body: JSON.stringify({campo,conteudo})
            });

            console.log('Task editada com sucesso');

        } catch(err){
            console.log(err);
        }
        
    },

    updateTaskStatus: async (taskId,status) => {

        try{
            console.log(taskId,status)
            const response = await fetch(`${API_URL}/${taskId}/status`, {
                method: 'patch',
                headers: {'Content-Type' : 'application/json'},

                body: JSON.stringify({status})
            });


        } catch(err){
            console.log(err);
        }
        
    },

    createTask: async (titulo,descricao) => {
       
        try{
            const response = await fetch(`${API_URL}`, {
                method: 'post',
                headers: {'Content-type' : 'application/json'},
                body: JSON.stringify({titulo,descricao})
            });

        } catch(err){
            console.log(err);
        }
    },

    deleteTask: async (taskId) => {
       
        try{
            const response = await fetch(`${API_URL}`, {method: 'delete'})
                
        } catch(err){
            console.log(err);
        }
    }



}
