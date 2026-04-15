
const messageHandler = {

getCommand(msg){

    if(!msg.trim().startsWith('/')) return;

    return msg.split(' ')[0].slice(1);

},

getTitle(msg){

    return msg.split(' ').slice(1).join(' ').trim();
    
},

parseMessage(msg){
    
    let command;
    let title;

    try{
        command = this.getCommand(msg);
    }catch(err){
        throw new Error('Falha ao tentar coletar comando');
    }

    try{
        title = this.getTitle(msg);
    }catch(err){
        console.log('Falha ao tentar coletar titulo');
    }

    
    const result = {command, title};


    return result;
}

}

const message = {'task' : ()=>{console.log('hello')}};
const func = message['task'];
func();




module.exports = messageHandler



