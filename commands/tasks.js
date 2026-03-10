const taskService = require('../services/taskService');



module.exports = { 
    name : "task",

    async execute(message, args) {

    const task = await taskService.createTask(args, message.author);
    message.reply(`Task created: ${task.text}`);   
      
}
 }