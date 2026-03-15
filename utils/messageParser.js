function messageParser(messageText){

    messageText = messageText.split(' ');
    
    if(messageText[0][0] == '/'){
        command = messageText[0].replace('/','');
        console.log(command);
        body = messageText.slice(1).join(' ')
        console.log(body)

        return (command, body)
        
    }

    console.log("Sintaxe de comando está errada")
    return "Sintaxe errada"

    
}

module.exports = {messageParser}