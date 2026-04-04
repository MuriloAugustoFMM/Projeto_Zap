const taskModel = require('../models/taskModel');

const taskController = {
    getTasks: async (req,res) => {

        console.log('indo pegar as tasks...')
        try{
            const tasks = await taskModel.getTasks();

            return res.json(tasks);
            
        } catch(err){
            return res.status(500).json({error: 'Erro ao tentar pegar todas as tasks'});
        }
    },

    getTask: async (req,res) => {
        try{
            const taskId =  req.body.taskId;
            const task = await taskModel.getTask(taskId);

            return res.json(task);

        } catch(err){
            return res.status(500).json({error: 'erro ao tentar pegar a task'});
        }
    },

    createTask: async (req,res) =>{

        try{
            const titulo = req.body.titulo;
            const descricao = req.body.descricao

            const result = await taskModel.createTask(titulo,descricao);

            return res.json(result);

        } catch(err){
            return res.status(500).json({error : 'erro ao tentar criar task'});
        }

    },

    updateTask: async (req,res) => {

        try{
            const taskId = req.params.id;
            const campo = req.body.campo;
            const conteudo = req.body.conteudo;
            const status = req.body.status ? req.body.status : '';

            const result = await taskModel.updateTask(taskId,campo,conteudo,status);

            return res.json(result);
        } catch(err){
            return res.status(500).json({error: 'erro ao tentar atualizar task'})
        }

    },

    deleteTask: async (req,res) => {

        try{
            const taskId = req.params.id;

            const result = await taskModel.deleteTask(taskId);

            return res.json(result);
        } catch(err){
            return json.status(500).json({error : 'erro ao tentar excluir task'});
        }

    }



};

module.exports = taskController