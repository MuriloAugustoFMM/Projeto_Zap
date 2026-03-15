const messageParser = require('../utils/messageParser')

function messageHandler(message){
    console.log("mensagem recebida")

    console.log(`COMANDOS: ${messageParser(message)}`)


}