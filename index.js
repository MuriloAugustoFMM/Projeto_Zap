const client = require('./bot/client');
const handleMessage = require('./bot/messageHandler');

client.on('message', async (message) =>{
    await handleMessage(message)
})

client.initialize()