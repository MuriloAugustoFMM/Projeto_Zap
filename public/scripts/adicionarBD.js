async function criarTask(){

    const titulo = document.getElementById("task-titulo").value
    const descricao = document.getElementById("task-descricao").value
    const idTask = document.getElementById("task-id").value
    console.log(titulo, descricao)

    if(!idTask){

        try{
            console.log("nova task")
            const response = await fetch('http://localhost:3000/task', 
            {
                method : 'POST',
                headers : {'Content-type' : 'application/json'},
                body : JSON.stringify({title : titulo, desc : descricao, status : 'todo'})

            }); 

        }catch(err){
            console.log(`Erro ao tentar adicionar dados ${err}`)
        }
        

    }else{

        try{
            console.log("editando task")
            const card = document.querySelector(`[data-id = "${idTask}"]`)
            const listaCards = card.parentElement;
            const sts = listaCards.parentElement.id

            updateStatusBD(idTask, sts, titulo, descricao)

        }catch(err){
            console.log(`Erro ao tentar atualizar task ${err}`)
        }




    }
    
    
    closeModal();
    updateHTML();
}