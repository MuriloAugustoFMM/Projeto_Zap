let serviceWpp;
let commands = [];

module.exports = {

    createTask(title){
        console.log('criando task')
        serviceWpp.createTask(title);
    },

    commandSelector(command){
        console.log('selecionando comando')

        return commands[command];
        

    },

    setUp(serviceObject){
        serviceWpp = serviceObject;
        commands = {'task' : this.createTask};
    }


}