const fs = require('fs');
const Anime = require('../models/anime');

const archivoAnime = './archivo/anime.json';

// Función para leer todos los animes del archivo
const leerTodo = () => {
  const data = fs.readFileSync(archivoAnime, 'utf-8');
  const animes = JSON.parse(data);
  return animes; //Retorno el jSon
};


const leerTodoComoArreglo = () => {
  const animes = leerTodo();  // Obtenemos un objeto JSON 
  const animesArray = Object.values(animes).map((anime, index) => {
    anime.id = index + 1;  // Asignamos un número de identificación a cada anime en base a su posición en la lista
    return anime;  // Devolvemos el anime modificado para construir un nuevo arreglo
  });
  console.log(animesArray);  // Imprimimos el arreglo de animes con sus identificaciones
  return animesArray;  // Devolvemos el arreglo de animes modificado
}

//leerTodoComoArreglo();  // Llamamos a la función


const leerAnimePorId = (id) => {
  const animes = leerTodoComoArreglo();
  const animeEncontrado = animes.find((anime) => anime.id === id);
  return animeEncontrado;
};


const leerAnimePorNombre = (nombre) => {
  const animes = leerTodoComoArreglo();
  const animeEncontrado = animes.find((anime) => anime.nombre.toLowerCase() === nombre.toLowerCase());
  return animeEncontrado;
};

const eliminarAnimePorId = (id) => {
  const animes = leerTodoComoArreglo();
  const indice = animes.findIndex((anime) => anime.id === id);
  console.log("-----"+indice)
  
  if (indice !== -1) {
    animes.splice(indice, 1);
    return animes;
  }
  
  return null;
};

const eliminarAnimePorNombre = (nombre) => {
  const animes = leerTodoComoArreglo();
  const indice = animes.findIndex((anime) => anime.nombre.toLowerCase() === nombre.toLowerCase());
  
  if (indice !== -1) {
    animes.splice(indice, 1);
    return animes;
  }
  
  return null;
};


const actualizarAnimePorId = (id, animeActualizado) => {
  const animes = leerTodoComoArreglo();
  const indice = animes.findIndex((anime) => anime.id === id);

  if (indice !== -1) {
    animes[indice] = { ...animes[indice], ...animeActualizado };
    return animes[indice];
  }

  return null;
};



const actualizarAnimePorNombre = (nombre, animeActualizado) => {
  const animes = leerTodoComoArreglo();
  const indice = animes.findIndex(
    (anime) => anime.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (indice !== -1) {
    animes[indice] = { ...animes[indice], ...animeActualizado };
    return animes[indice];
  }

  return null;
};

// PRUEBAS

console.log("---------------MUESTRA DE Leer POR ID------------------------")

console.log(`Leer por id: ${JSON.stringify(leerAnimePorId(1), null, 1)}`);
console.log("---------------MUESTRA DE Leer POR Nombre------------------------")
console.log(`Leer por Nombre: ${JSON.stringify(leerAnimePorNombre("Akira"), null, 1)}`);
const animeEliminado = JSON.stringify(eliminarAnimePorId(2),null,1);
console.log("---------------MUESTRA DE ELIMINAR POR ID------------------------")
console.log("anime eliminado con el id 2 , aqui se muestra el nuevo arreglo"+ animeEliminado );
const animeEliminadoPorNombre = JSON.stringify(eliminarAnimePorNombre("Neon Genesis Evangelion"),null,1);
console.log("---------------MUESTRA DE ELIMINAR POR NOMBRE------------------------")
console.log("anime eliminado por nombre 'Neon Genesis Evangelion' , aqui se muestra el nuevo arreglo "+ animeEliminadoPorNombre );

const animeActualizado = {
  nombre: "Dragon Ball Z",
  genero: "Shonen",
  año: "1989",
  autor: "Akira Toriyama",
};

const animeActualizadoPorId = actualizarAnimePorId(2, animeActualizado);
console.log(`Anime actualizado con el id 2, aquí se muestra el anime actualizado: ${JSON.stringify(animeActualizadoPorId,null,1)}`);

















module.exports = {
  leerTodoComoArreglo: leerTodoComoArreglo,
  // otras funciones del servicio
};