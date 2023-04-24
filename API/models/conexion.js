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

connection.query("USE sistema", (error, results, fields) => {
    if (error) throw error;
    console.log("Base de datos seleccionada: sistema");
});
