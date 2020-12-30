const mysql = require('mysql');

var con = mysql.createConnection({
    "connectionLimit": 1000,
    "user": "root",
    "password": "admin",
    "database": "api",
    "host": "localhost",
    "port": 3306
});
con.connect((err) => {
    if (err) {
        console.log('Erro ao conectar ao banco de dados...', err)
        return
    }
    console.log('Conexão Realizada!')
})


module.exports = con;


