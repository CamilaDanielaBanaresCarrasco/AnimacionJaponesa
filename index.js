const express = require('express');
const animeService = require('./services/animeService');
const bodyParser = require('body-parser');
const Anime = require('./models/anime');


const app = express(); //para utilizar express
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('anime', {
        titulo: 'ANIMES',
        arregloAnimes: animeService.leerTodoComoArreglo() // Aqui tengo el arreglo de animes
    });
});

// INGRESO AL FORMULARIO formularioInsertarAnime
app.get('/formularioInsertarAnime', (req, res) => {
    res.render('formularioInsertarAnime');
});

// Eliminar un anime por su ID
app.post('/eliminarAnime/:id', (req, res) => {
  const id = req.params.id;
  console.log("El anime eliminado es " + id);
  animeService.eliminarAnimePorId(id);
  
  // Obtener la lista actualizada de animes
  const arregloAnimes = animeService.leerTodoComoArreglo();
  
  // Renderizar la vista de la página principal con la lista actualizada
  res.render('anime', {
      titulo: 'ANIMES',
      arregloAnimes: arregloAnimes
  });
});

// Insertar un anime al JSON
app.post('/insertarAnime', (req, res) => {
    // Solicito los datos del formulario
    const nombre = req.body.txtNombre;
    const genero = req.body.txtGenero;
    const año = req.body.txtanio;
    const autor = req.body.txtAutor;

    // Creo un objeto con los datos del nuevo anime
    const anime = new Anime(nombre, genero, año, autor);

    // Inserto el anime en el JSON
    animeService.insertarAnime(anime);

    // Redirijo a la página principal
    res.redirect('/');
});

// Actualizar un anime por su ID
app.post('/actualizarAnime', (req, res) => {
    const id = req.body.id;
    const animeActualizado = {
        nombre: req.body.txtNombre,
        genero: req.body.txtGenero,
        año: req.body.txtanio,
        autor: req.body.txtAutor
    };

    animeService.actualizarAnimePorId(id, animeActualizado);

    res.redirect('/');
});

app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080");
});