
let matricula = '';
let nombre = '';
let domicilio = '';
let sexo = '';
let especialidad = '';

const baseUrl = /api/;

function leerInputs(){
    matricula = document.getElementById('Matricula').value;
    nombre = document.getElementById('Nombre').value;
    domicilio = document.getElementById('Domicilio').value;
    sexo = document.getElementById('Sexo').value;
    especialidad = document.getElementById('Especialidad').value;

    //console.log(matricula);console.log(nombre);console.log(domicilio);console.log(sexo);console.log(especialidad);
}


document.addEventListener('DOMContentLoaded', function() {
  //Para poder obtener los datos de los alumnos mediante axios
  axios.get(baseUrl+'mostrarTodos')
  .then(function (response) {
    // La lista de alumnos está en response.data
    const alumnos = response.data;
    
    // Llamada a una función para mostrar los alumnos en el HTML
    mostrarAlumnos(alumnos);
  })
  .catch(function (error) {
    console.log(error);
  });
  
});



//Funcion para mostrar alumnos
function mostrarAlumnos(alumnos) {
  const tabla = document.getElementById("alumnos-lista");
  const template = document.getElementById("fila-alumno");
  
  // Recorre la lista de alumnos y crea elementos HTML para cada uno
  for (let i = 0; i < alumnos.length; i++) {
    const alumno = alumnos[i];
    
    // Clona el template de la fila de alumno y obtiene las celdas de la fila
    const fila = template.content.cloneNode(true);
    const celdas = fila.querySelectorAll("td");
    
    // Asigna los valores de cada propiedad del alumno a las celdas de la fila
    celdas[0].textContent = alumno.id;
    celdas[1].textContent = alumno.matricula;
    celdas[2].textContent = alumno.nombre;
    celdas[3].textContent = alumno.domicilio;
    celdas[4].textContent = alumno.sexo;
    celdas[5].textContent = alumno.especialidad;
    
    // Agrega la fila a la tabla
    tabla.appendChild(fila);
  }
}


//Funcion para agregar alumnos mediante axios
function agregar(){
    leerInputs();
    if (matricula == '' || nombre == '' || domicilio == '' || sexo == '' || especialidad == '') {
        window.alert('Faltaron campos por llenar')
    } else {
        datosAInsertar = {matricula, nombre, domicilio, sexo , especialidad}
        axios.post(baseUrl+'insertar', datosAInsertar)
        .then(function (response) {
          location.reload()
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
}

//Funcion para agregar alumnos mediante axios
function eliminar() {
  // Leer la matrícula del alumno desde la interfaz de usuario
  leerInputs();

  // Verificar que se haya proporcionado una matrícula válida
  if (matricula == '') {
    window.alert('Matricula no encontrada')
  } else {
    axios.post(baseUrl+'eliminar', { matricula: matricula })
    .then(function (response) {
      location.reload()
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}


//Funcion para actualizar alumnos mediante axios
function actualizar(){
  leerInputs();
  
  if (matricula == '' || nombre == '' || domicilio == '' || sexo == '' || especialidad == '') {
      window.alert('Faltaron campos por llenar')
  } else {
      datosAInsertar = {matricula, nombre, domicilio, sexo , especialidad}
      axios.post(baseUrl+'actualizar', datosAInsertar)
      .then(function (response) {
        location.reload()
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

//Funcion para buscar alumnos mediante axios
function buscar() {
  // Leer la matrícula del alumno desde la interfaz de usuario
  leerInputs();

    axios.post(baseUrl+'consultarXmatricula', { matricula: matricula })
    .then(function (response) {
      if (response.data == '') {
          window.alert('No se encontro ningun alumno con esa matricula')
      } else {
      const alumnos = response.data;
      
      //primer template
      const template = document.getElementById('template-tablabuscar');
      const contenido = template.content.cloneNode(true);
      const contenedor = document.getElementById('mostrar-alumno-encontrado');
      contenedor.innerHTML = '';
      contenedor.appendChild(contenido);

              //Segundo template
              const tabla = document.getElementById("alumnos-lista2");
              const template2 = document.getElementById("template-filasbuscar");
      
              for (let i = 0; i < alumnos.length; i++) {
                  const alumno = alumnos[i];
          
                  // Clona el template de la fila de alumno y obtiene las celdas de la fila
                  const fila = template2.content.cloneNode(true);
                  const celdas = fila.querySelectorAll("td");
                  
                  // Asigna los valores de cada propiedad del alumno a las celdas de la fila
                  celdas[0].textContent = alumno.id;
                  celdas[1].textContent = alumno.matricula;
                  celdas[2].textContent = alumno.nombre;
                  celdas[3].textContent = alumno.domicilio;
                  celdas[4].textContent = alumno.sexo;
                  celdas[5].textContent = alumno.especialidad;
                  
                  // Agrega la fila a la tabla
                  tabla.appendChild(fila);
              }

      }

    })
    .catch(function (error) {
      console.log(error);
    });

}

document.getElementById('btnAgregar').addEventListener('click', agregar);
document.getElementById('btnBorrar').addEventListener('click', eliminar);
document.getElementById('btnActualizar').addEventListener('click', actualizar);
document.getElementById('btnBuscar').addEventListener('click', buscar);
