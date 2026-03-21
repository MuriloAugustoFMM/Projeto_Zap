const {Client} = require('pg')

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'zap_saas'
})


async function connectDb(){
    await client.connect() 
    console.log('COnectado ao banco de dados')
}

connectDb()

module.exports = client