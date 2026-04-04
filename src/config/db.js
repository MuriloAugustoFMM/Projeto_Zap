const {Pool} = require('pg')

const pool = new Pool({
    database: 'zap_saas',
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'postgres'
})


try{

    pool.connect()
    console.log('conectado com sucesso')

} catch(err) {console.log(err)}

module.exports = pool;