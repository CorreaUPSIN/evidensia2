// Importar los módulos necesarios
const http = require("http");
const express = require("express");
const bodyparser = require("body-parser");
const cors = require('cors');
const misRutas = require("./router/index");

const app = express();

// Establecer el motor de plantillas como EJS
app.set("view engine","ejs");

// Establecer la carpeta pública para servir archivos estáticos
app.use(express.static(__dirname + "/public"));

// Analizar los cuerpos de las solicitudes HTTP
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

// Permitir solicitudes desde cualquier origen (CORS)
app.use(cors());

// Importar las rutas definidas en el archivo index.js dentro de la carpeta router
app.use(misRutas);

// Registrar el motor de plantillas EJS para la extensión html
app.engine("html", require("ejs").renderFile);

// Agregar un middleware para manejar solicitudes no encontradas (404)
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/public/error.html");
});

// Iniciar el servidor en el puerto 3030 y mostrar un mensaje en la consola
const puerto = 3030;
app.listen(puerto, () => {
  console.log(`Servidor iniciado en el puerto ${puerto}`);
});
