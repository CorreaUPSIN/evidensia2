const mysql = require("mysql2");

var sqlConnection = mysql.createConnection({
    host:"localhost",
    user:"jorge",
    password:"root",
    database:"sistema"
});

sqlConnection.connect(function (err){
    if (err) {
        console.log('Surguio un error al conectarse ' + err)
    } else{

        console.log('Se conecto con exito');
    }
});

module.exports = sqlConnection;
