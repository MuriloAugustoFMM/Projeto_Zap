const parseCommand = require('../utils/commandParser')
const loadCommands = require('../loaders/commandLoader')

const commands = loadCommands()

async function handleMessage(message) {
    if(message.fromMe) return;

    const parsed = parseCommand(message.body)

    if(!parsed) return;

    const {command, args } = parsed;

    const cmd = commands[command];

    if(!cmd) console.log(`Command ${command} not found!`);

    cmd.execute(message, args);


}

module.exports = handleMessage