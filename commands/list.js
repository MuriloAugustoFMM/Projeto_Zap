const taskService = require('../services/taskService');



module.exports = { 
    name : "list",

    async execute(message) {

        const workspaceId = message.from;

        const tasks = taskService.getTasks(workspaceId);

        if(tasks.length === 0) {
            message.reply('No tasks found.');
            return;
        }

        let text = 'Lista de Tarefas:\n\n';

        tasks.forEach((task, index)=>{
            text += `${index + 1} - ${task.text}\n`;
    });
    message.reply(text);
}
 }