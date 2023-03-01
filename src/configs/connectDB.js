// get the client
const mysql = require('mysql2/promise')

console.log("Creating connection pool...");

module.exports.pool = mysql.createPool({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12601355',
    password: '46equVaDNW',
    database: 'sql12601355',
    // password: 'password'
})
