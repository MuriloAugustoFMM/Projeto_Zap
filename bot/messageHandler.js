const messageParser = require('../utils/messageParser')
const pdf = require('../commands/pdf')

async function  messageHandler(message){
    console.log("mensagem recebida")
    (command,body) = messageParser(message)

    switch(command){
        case 'pdf':
            await pdf.generate_pdf(body)
    }
    
}