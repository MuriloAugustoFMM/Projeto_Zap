const taskService = require('../services/taskService');



module.exports = { 
    name : "task",

    async execute(message, args) {

    const workspaceId = message.from;

    const task = await taskService.createTask(
        workspaceId,
        args,
        message.author);

    message.reply(`Task created: ${task.text}`);   
      
}
 }