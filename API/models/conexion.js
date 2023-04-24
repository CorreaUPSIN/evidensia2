const mysql = require("mysql2");

var sqlConnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Gonquintana1m",
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

