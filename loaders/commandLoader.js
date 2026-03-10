const fs = require('fs');
const path = require('path');

function loadCommands(){
    const commands = {};

    const files = fs.readdirSync(path.join(__dirname, "../commands"));

    for(const file of files) {
        
        const command = require(path.join(__dirname, `../commands/${file}`))
        
        commands[command.name] = command;
    }
    return commands;
}

module.exports = loadCommands;