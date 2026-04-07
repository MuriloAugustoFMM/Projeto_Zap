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

    updateTask: async (taskId,titulo='',descricao='') => {

        try{
            
            const response = await fetch(`${API_URL}/${taskId}`, {
                method: 'PUT',
                headers: {'Content-type' : 'application/json'},

                body: JSON.stringify({titulo : String(titulo),descricao : String(descricao)})
            });

            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

            return await response.json();
        } catch(err){
            console.log(err);
            throw err;     
        }
        
    },

    updateTaskStatus: async (taskId,status) => {

        try{
            if(!taskId || !status){
                console.log('status ou task indefinidos');
                return
            }

            const response = await fetch(`${API_URL}/${taskId}/status`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ status: String(status).trim() })
            });

            return await response.json();   
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
            const response = await fetch(`${API_URL}/${taskId}`, {method: 'delete'})
                
        } catch(err){
            console.log(err);
        }
    }



}
