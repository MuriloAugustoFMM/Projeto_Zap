
async function moverTask(taskId, novoStatus){
    

    updateStatusBD(taskId,novoStatus);

    updateHTML();
}



async function dropFunc(e){

    const novoStatus = e.currentTarget.id;
    
    //console.log(`drop em ${novoStatus}`)
    
    id = e.dataTransfer.getData('text');
    //console.log(id)

    moverTask(id,novoStatus)

}