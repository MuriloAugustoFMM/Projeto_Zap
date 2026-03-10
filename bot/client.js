const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless : false,
    }
   });

// Evento para indicar que o cliente está pronto
client.on('ready', () => {
    console.log('Client pronto');
    
});

// Evento para gerar um QR code para autenticação
client.on('qr', qr => {
    qrcode.generate(qr, {small : true});
})

// Evento para receber mesagens e imprimir no console
client.on('message', msg => {
    if(msg.fromMe) return; // Ignorar mensagens enviadas por mim mesmo
    const isPerson = msg.from.endsWith('@c.us');
    const isGroup = msg.from.endsWith('@g.us');
    
    if (isPerson || isGroup) {
        console.log(`[${isGroup ? 'GRUPO' : 'PRIVADO'}] ${msg.from}: ${msg.body}`);
    } else{
        console.log(`[OUTRO] ${msg.from}: ${msg.body}`);
    }
});

module.exports = client;