// Importar los módulos necesarios
const bodyParser = require("body-parser");
const express = require("express");

// Crear una instancia de Router de Express
const router = express.Router();

// Importar el modelo de Alumnos de la base de datos
const AlumnosDb = require('../models/alumnos.js');

// Crear un objeto para almacenar información de alumno
let alumno = {};

// Manejar la solicitud GET a la ruta '/mostrarTodos'
router.get('/mostrarTodos', async (req, res) => {
  try {
    // Mostrar todos los registros de alumnos en la base de datos
    resultado = await AlumnosDb.mostrarTodos();
    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar la lista de alumnos.');
  }
});

// Manejar la solicitud POST a la ruta '/insertar'
router.post("/insertar", async(req, res) => {
  // Crear un objeto alumno con la información recibida en el cuerpo de la solicitud
  const alumno = {
    matricula: req.body.matricula,
    nombre: req.body.nombre,
    domicilio: req.body.domicilio,
    sexo: req.body.sexo,
    especialidad: req.body.especialidad
  };

  // Insertar el alumno en la base de datos
  resultado = await AlumnosDb.insertar(alumno);
  res.json(resultado);
});

// Manejar la solicitud POST a la ruta '/eliminar'
router.post("/eliminar", async(req, res) => {
  // Obtener la matrícula del alumno a eliminar desde el cuerpo de la solicitud
  var matricula = req.body.matricula;

  // Eliminar el alumno de la base de datos
  resultado = await AlumnosDb.borrar(matricula);
  res.json(resultado);
});

// Manejar la solicitud POST a la ruta '/actualizar'
router.post("/actualizar", async (req, res) => {
  // Obtener la matrícula del alumno a actualizar y su información actualizada desde el cuerpo de la solicitud
  const matricula = req.body.matricula;
  const alumno = {
    nombre: req.body.nombre,
    domicilio: req.body.domicilio,
    sexo: req.body.sexo,
    especialidad: req.body.especialidad
  }

  // Actualizar el alumno en la base de datos
  resultado = await AlumnosDb.actualizar(matricula, alumno);
  res.json(resultado);
});

// Manejar la solicitud POST a la ruta '/consultarXmatricula'
router.post("/consultarXmatricula", async(req, res) => {
  // Obtener la matrícula del alumno a consultar desde el cuerpo de la solicitud
  var matricula = req.body.matricula;

  // Buscar el alumno en la base de datos por su matrícula
  resultado = await AlumnosDb.buscarXMatricula(matricula);
  res.json(resultado);
});

// Exportar el módulo Router para que pueda ser utilizado en otros archivos
module.exports = router;
