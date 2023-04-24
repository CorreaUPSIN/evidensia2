// Se importa el módulo 'response' de 'express'
const json = require('express/lib/response');

// Importa el módulo que contiene la conexión a la base de datos
const promise = require('../models/conexion.js');

// Importa el módulo que contiene la conexión a la base de datos
const conexion = require('../models/conexion.js');

// Crea un objeto vacío llamado AlumnosDb
var AlumnosDb = {};

// Agrega una función al objeto AlumnosDb llamada 'mostrarTodos' que devuelve una promesa
AlumnosDb.mostrarTodos = function mostrarTodos(){
    // Retorna una nueva promesa
    return new Promise ((resolve, reject)=>{
        var sqlConsulta = "select * from alumnos";
        // Ejecuta una consulta SQL en la base de datos utilizando la conexión previamente establecida
        conexion.query(sqlConsulta,null,function(err,res){
            if (err){
                console.log('Surgio un error ' + err.message);
                reject(err);
            }else {
                resolve(res);
            }
        });
    });
}

// Agrega una función al objeto AlumnosDb llamada 'insertar' que devuelve una promesa
AlumnosDb.insertar = function insertar(alumno){
    // Retorna una nueva promesa
    return new Promise((resolve,reject)=>{
        var sqlConsulta = "insert into alumnos set ?";
        // Ejecuta una consulta SQL en la base de datos utilizando la conexión previamente establecida
        conexion.query(sqlConsulta,alumno,function(err,res){
            if(err){
                console.log('Surgio un error ' + err.message);
                reject(err);
            } else {
                resolve({
                    id:res.insertId,
                    matricula:alumno.matricula,
                    nombre:alumno.nombre,
                    domicilio:alumno.domicilio,
                    sexo:alumno.sexo,
                    especialidad:alumno.especialidad
                });
            }
        });
    });
}

// Agrega una función al objeto AlumnosDb llamada 'borrar' que devuelve una promesa
AlumnosDb.borrar = function borrar(matricula){
    // Retorna una nueva promesa
    return new Promise ((resolve, reject)=>{
        var sqlConsulta = "delete from alumnos where matricula = ?";
        // Ejecuta una consulta SQL en la base de datos utilizando la conexión previamente establecida
        conexion.query(sqlConsulta,[matricula],function(err,res){
            if (err){
                console.log('Surgió un error ' + err.message);
                reject(err);
            }else{
                resolve(res);
            }
        })
    })
}


// Agrega una función al objeto AlumnosDb llamada 'actualizar' que devuelve una promesa
AlumnosDb.actualizar = function actualizar(matricula, alumno){
    // Retorna una nueva promesa
    return new Promise((resolve, reject) => {
        var sqlConsulta = "UPDATE alumnos SET nombre = ?, domicilio = ?, sexo = ?, especialidad = ? WHERE matricula = ?";
        // Ejecuta una consulta SQL en la base de datos utilizando la conexión previamente establecida
        conexion.query(sqlConsulta, [alumno.nombre, alumno.domicilio, alumno.sexo, alumno.especialidad, matricula], function(err, res) {
            if(err) {
                console.log('Surgió un error ' + err.message);
                reject(err);
            } else {
                console.log(res, matricula, alumno);
                resolve(res);
            }
        });
    });
}

// Agrega una función al objeto AlumnosDb llamada 'buscarXMatricula' que devuelve una promesa
AlumnosDb.buscarXMatricula = function buscarXMatricula(matricula){
    return new Promise((resolve, reject)=>{
        var sqlMostrar = "select * from alumnos where matricula = ?"
        // Retorna una nueva promesa
        conexion.query(sqlMostrar,[matricula],function(err,res){
            // Ejecuta una consulta SQL en la base de datos utilizando la conexión previamente establecida
            if(err){
                console.log('Surgio un error ' + err.message);
                reject(err);
            } else {
                console.log(res);
                resolve(res);
            }
        });
    })
}

// Exportar el módulo AlumnosDb para que pueda ser utilizado en otros archivos
module.exports = AlumnosDb;


