const mysql = require("mysql2");
const config = require("../config/dbConf");

const connection = mysql.createPool({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
})
connection.on('connection',(connect)=>{
    console.log("Connection distablished");
})
connection.on('error',(err)=>{
    console.error(new Date(), 'MySQL error', err.code);
})
connection.on('close',()=>{
    console.error(new Date(), 'MySQL close', err)
})

module.exports = connection;