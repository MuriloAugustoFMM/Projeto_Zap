async function updateStatusBD(taskId, statusNovo, tituloNovo="", descNova=""){

    if(!tituloNovo || !descNova){

        const response = await fetch(`http://localhost:3000/task/${taskId}`,
        {
            method : 'PUT',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({status : statusNovo})
        })
        return response;

    }

    const response = await fetch(`http://localhost:3000/task/${taskId}`,
        {
            method : 'PUT',
            headers : {'Content-type' : 'application/json'},
            body: JSON.stringify({status : statusNovo, title : tituloNovo, desc : descNova})
        }
    )

    return response;
    
   
}

async function deleteTaskDB(taslId){

    const respone = await fetch(`/task/${taslId}`,
        {
            method: 'DELETE'
        })

    if(!respone.ok){
        console.log('falha')
    }
}

