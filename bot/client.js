const { Client, AuthStrategy, LocalAuth } = require('whatsapp-web.js')
const qrcode = require("qrcode-terminal")
const messageHandler = require('./messageHandler')

const client = new Client({
    AuthStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr,{small: true})
})

client.on('message', message =>{
    console.log(`Autor: ${message.from}\n
        Mensagem: ${message.body}`)
    messageHandler(message)
})

client.on("ready", ()=>{
    console.log("Cliente whatsapp está pronto")
})


module.exports = client
