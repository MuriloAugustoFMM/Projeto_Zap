const client = require('./clientWpp');
const messageHandler = require('./messageHandler');
const serviceWpp = require('./serviceWpp');
const commands = require('./commands');

//setando o service no command:
commands.setUp(serviceWpp);



client.on('message', (msg) => {
    
    try{
        const result = messageHandler.parseMessage(msg);
        const func = commands.commandSelector(result.command);
        func(result.title)

    }catch(err){
        console.log('Erro');
    }

});

function teste(msg){
     try{
        const result = messageHandler.parseMessage(msg);
        const func = commands.commandSelector(result.command);
        func(result.title)

    }catch(err){
        console.log('Erro');
    }
}

teste('/task TESTANDO AS FUNCOES')