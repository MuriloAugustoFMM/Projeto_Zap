const taskService = require('../services/taskService');

async function execute(message) {
    
    const tasks = taskService.getTasks();

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

module.exports = { execute }