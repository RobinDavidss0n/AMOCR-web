const {Client} = require('pg')

const client = new Client({
    host: 'postgres_db',
    database: 'pgdb',
    user: 'app',
    password: 'abc123',
    port: 5432,
    ssl: false
})

client.connect(error => {
    if (error) {
        console.log('Connection error: ', error.stack)
    } else {
        console.log('Connected to database.')
    }
})

module.exports = client