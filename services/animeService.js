const fs = require('fs');
const Anime = require('../models/anime');

const archivoAnime = './archivo/anime.json';

// Función para leer todos los animes del archivo
const leerTodo = () => {
  const data = fs.readFileSync(archivoAnime, 'utf-8');
  const animes = JSON.parse(data);
  return animes;
};

// Función para leer un anime por su id
const leerPorId = (id) => {
  const animes = leerTodo(); 
  return animes[id] || null; // Devuelve el anime correspondiente al id o null si no se encuentra
};

// Función para leer un anime por su nombre
const leerPorNombre = (nombre) => {
    const animes = leerTodo();
    let animeEncontrado = null;
  
    // Obtenemos un array con los valores del objeto animes
    const animesArray = Object.values(animes);
  
    // Iteramos sobre cada anime en el array
    animesArray.forEach((anime) => {
      // Verificamos si el nombre del anime coincide (ignorando mayúsculas/minúsculas)
      if (anime.nombre.toLowerCase() === nombre.toLowerCase()) {
        animeEncontrado = anime; // Asignamos el anime encontrado
      }
    });
  
    return animeEncontrado; // Devuelve el anime encontrado o null si no se encuentra
  };

// Función para agregar un nuevo anime al archivo
const agregarAnime = (anime) => {
  const animes = leerTodo();
  const ids = Object.keys(animes);
  const id = (ids.length > 0) ? (parseInt(ids[ids.length - 1]) + 1).toString() : '1';
  animes[id] = anime; // Asignamos el nuevo anime al objeto animes con el nuevo id
  guardarAnimes(animes);
};

// Función para actualizar un anime existente
const actualizarAnime = (id, animeActualizado) => {
  const animes = leerTodo();
  if (animes.hasOwnProperty(id)) {
    animes[id] = animeActualizado; // Actualizamos el anime existente con los nuevos datos
    guardarAnimes(animes);
    return true; // Indica que la actualización se realizó con éxito
  }
  return false; // Indica que el anime no existe, no se pudo actualizar
};

// Función para eliminar un anime por su id
const eliminarAnime = (id) => {
  const animes = leerTodo();
  if (animes.hasOwnProperty(id)) {
    delete animes[id]; // Eliminamos el anime del objeto animes
    guardarAnimes(animes);
    return true; // Indica que la eliminación se realizó con éxito
  }
  return false; // Indica que el anime no existe, no se pudo eliminar
};

// Función para guardar los animes en el archivo
const guardarAnimes = (animes) => {
  const data = JSON.stringify(animes, null, 2);
  fs.writeFileSync(archivoAnime, data, 'utf-8');
};

// Ejemplo de uso:

const anime1 = new Anime("One Piece", "Shonen", "1999", "Eiichiro Oda");
const anime2 = new Anime("Attack on Titan", "Shonen", "2013", "Hajime Isayama");

agregarAnime(anime1);
agregarAnime(anime2);

console.log(leerPorNombre("Attack on Titan"));

console.log(leerPorId("1"));

actualizarAnime("2", new Anime("Attack on Titan", "Shonen", "2013", "Hajime Isayama Actualizado"));

eliminarAnime("1"); // tendria que ser nulo ya que lo elimine arriba

console.log("╭─────‧°.ʕ•́ᴥ•̀ʔ.°‧─────≪");
console.log("♡ Camila Bañares Carrasco");
console.log("╰─────‧°.ʕ•́ᴥ•̀ʔ.°‧─────⌲")
