async function updateStatusBD(taksId, statusNovo){

    console.log(`http://localhost:3000/task/${taksId}`)

    const response = await fetch(`http://localhost:3000/task/${taksId}`,{
        method : 'PUT',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({status : statusNovo})
    })

}

