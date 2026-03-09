const taskService = require('../services/taskService');

async function execute(message, args) {
    const task = await taskService.createTask(args, message.author);
    message.reply(`Task created: ${task.text}`);     
}

module.exports = { execute }