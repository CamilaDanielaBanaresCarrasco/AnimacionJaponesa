const express = require('express');
const animeService = require('./services/animeService');

const app = express();

app.use(express.static('public'));

const animes = animeService.leerTodo('./archivo/anime.json');

animes.forEach((anime) => {
  console.log('Nombre: ' + anime.nombre);
  console.log('Género: ' + anime.genero);
  console.log('Año: ' + anime.año);
  console.log('Autor: ' + anime.autor);
  console.log('-------------------------');
});

app.listen(8080);