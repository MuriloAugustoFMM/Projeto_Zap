
async function moverTask(taskId, novoStatus){
    

    updateStatusBD(taskId,novoStatus);

    renderTasks();
}



async function dropFunc(e){

    // seleciona o id da coluna que o card está sobre
    const novoStatus = e.currentTarget.id;
    
    //console.log(`drop em ${novoStatus}`)
    
    // coleta os dados encapsulados pelo evento
    id = e.dataTransfer.getData('text');
    //console.log(id)

    // atualiza o status da task e recarrega a página
    moverTask(id,novoStatus)

}