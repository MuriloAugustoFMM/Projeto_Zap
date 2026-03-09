const parseCommand = require('../utils/commandParser')
const taskCommand = require('../commands/tasks')
const listCommand = require('../commands/list')

async function handleMessage(message) {
    if(message.fromMe) return;

    const parsed = parseCommand(message.body)

    if(!parsed) return;

    const {command, args } = parsed

    switch(command) {
        case 'task':
            await taskCommand.execute(message, args)
            break;
        
        case 'list':
            await listCommand.execute(message, args)
            break;
        
        default:
            message.reply('Unknown command. Please use "task" or "list".')
    }

}

module.exports = handleMessage