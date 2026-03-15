const {spawn} = require('child_process')
const path = require("path")


const script_path = path.join(__dirname,'../scripts/convert_img_to_pdf.py')

  
async function generate_pdf(path){


    const process = await spawn('python',[script_path,path])
    //console.log(process)
    process.stdout.on("data", data =>{
        console.log(`data: ${data}`)
    })

    process.stderr.on('data', err =>{
        console.log(`erro: ${err}`)
    })
}

module.exports = {
    generate_pdf
}


