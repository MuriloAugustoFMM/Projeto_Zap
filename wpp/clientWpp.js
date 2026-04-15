const {Client, LocalAuth, AuthStrategy} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('ready', () => {
    console.log('Client pronto');
    
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('authenticated', () =>{
    console.log('Autenticado');
})

client.initialize();

module.exports = client;