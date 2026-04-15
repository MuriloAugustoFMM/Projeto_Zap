const API_URL = 'http://localhost:3000/api/tasks';

module.exports = {

    async createTask(title){
       try{
            const desc = '';
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {'Content-type' : 'application/json'},
                body: JSON.stringify({title,desc})
            });
        }catch(err){
            console.log('Erro ao conectar com o backend');
        }

    }
}

