const fs = require('fs');
const Anime = require('../models/anime');
const archivoAnime = './archivo/anime.json';
const archivoUnSoloAnime = './archivo/archivoUnSoloAnime';

// Función para leer todos los animes del archivo
const leerTodo = () => {
    const data = fs.readFileSync(archivoAnime, 'utf-8');
    const animes = JSON.parse(data);
    return animes; //Retorno el JSON
};

// Funcion para tranformar los datos en un arreglo y devolver un arreglo
const leerTodoComoArreglo = () => {
    const animes = leerTodo();  // Obtenemos un objeto JSON 
    const animesArray = Object.values(animes).map((anime, index) => {
        anime.id = index + 1;  // Asignamos un número de identificación a cada anime en base a su posición en la lista
        return anime;  // Devolvemos el anime modificado para construir un nuevo arreglo
    });
    return animesArray;  // Devolvemos el arreglo de animes modificado
};

const leerAnimePorId = (id) => {
    const animes = leerTodoComoArreglo();
    const animeEncontrado = animes.find((anime) => anime.id === parseInt(id, 10));

    return animeEncontrado; // Devolver el anime encontrado o null si no se encuentra
};

const guardarAnimeEnArchivo = (anime) => {
    const animes = leerTodoComoArreglo();
    animes.push(anime);
    fs.writeFileSync(archivoAnime, JSON.stringify(animes, null, 2), 'utf-8');
};

const leerAnimePorNombre = (nombre) => {
    const animes = leerTodoComoArreglo();
    const animeEncontrado = animes.find((anime) => anime.nombre.toLowerCase() === nombre.toLowerCase());
    return animeEncontrado;
};

const eliminarAnimePorNombre = (nombre) => {
    const animes = leerTodoComoArreglo();
    const indice = animes.findIndex((anime) => anime.nombre.toLowerCase() === nombre.toLowerCase());

    if (indice !== -1) {
        animes.splice(indice, 1);
        guardarAnimes(animes);
        return animes;
    }

    return null;
};

const eliminarAnimePorId = (id) => {
    const todosLosAnimes = leerTodoComoArreglo();
    // Filtrar el arreglo para obtener todos los animes excepto el que tiene el ID proporcionado
    const animesRestantes = todosLosAnimes.filter((anime) => anime.id !== parseInt(id, 10));

    if (animesRestantes.length !== todosLosAnimes.length) {
        // Guardar el arreglo actualizado en el archivo
        guardarAnimes(animesRestantes);

        console.log("Anime eliminado. ID:", id);
        console.log("Estos son los animes que quedaron al eliminar el id correspondiente", animesRestantes);
        return animesRestantes; // Devolver el arreglo de animes actualizado
    }

    return null;
};

const guardarAnimes = (animes) => {
    fs.writeFileSync(archivoAnime, JSON.stringify(animes, null, 2), 'utf-8');
};

const actualizarAnimePorId = (id, animeActualizado) => {
    console.log(`pasamos por aqui con el id ${id}`);
    console.log(`pasamos por aqui con el anime ${animeActualizado}`);
    const animes = leerTodoComoArreglo();
    console.log("leimos los animes");
    const indice = animes.findIndex((anime) => anime.id === parseInt(id, 10));
    console.log("comparamos los id");
    if (indice !== -1) {
        console.log("entramos al if");
        animes[indice] = { ...animes[indice], ...animeActualizado };
        guardaAnimes(animes);
        console.log("retornamos");
        return animes[indice];
    }

    return null;
};

const guardaAnimes = (animes) => {
    console.log("guardamos los datos");
    fs.writeFileSync(archivoAnime, JSON.stringify(animes, null, 2), 'utf-8');
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

const insertarAnime = (anime) => {
    const todosLosAnimes = leerTodoComoArreglo();

    // Agregar el nuevo anime al arreglo
    todosLosAnimes.push(anime);

    // Guardar el arreglo actualizado en el archivo
    fs.writeFileSync(archivoAnime, JSON.stringify(todosLosAnimes, null, 2), 'utf-8');

    console.log("Aqui estan todos los animes", todosLosAnimes);
    console.log("Datos del anime:", anime);
};

module.exports = {
    leerTodoComoArreglo,
    insertarAnime,
    leerTodo,
    eliminarAnimePorId,
    actualizarAnimePorId,
    leerAnimePorId,
    guardarAnimeEnArchivo
};