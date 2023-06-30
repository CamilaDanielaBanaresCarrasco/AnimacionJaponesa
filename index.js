const express = require('express');
const animeService = require('./services/animeService');
const Anime = require('./models/anime');

const app = express(); //para utilizar express

//app.use(express.static('public'));

app.set('view engine', 'hbs');


//leerTodo()
const animesArray = animeService.leerTodoComoArreglo();
console.log(animesArray +"aqui estan los animes") //animes en un arreglo

app.get('/', (req,res) =>{
  res.render('anime',{
    titulo: 'ANIMES',
    arregloAnimes: animeService.leerTodoComoArreglo() // Aqui tengo el arreglo de animes
  });

});

//INGRESO AL FORMULARIO formularioInsertarAnime
app.get('/formularioInsertarAnime', (req, res) => {
  res.render('formularioInsertarAnime');
});



// insertar un anime al JSON
app.get('/insertarAnime', (req, res) => {
    //solicito los datos
    const nombre = req.query.txtNombre;
    const txtGenero = req.query.txtGenero;
    const txtanio = req.query.txtanio;
    const txtAutor = req.query.txtAutor;
   //Compruebo 
    console.log("Aqui está el nombre "+ nombre)
    console.log("Aqui está el nombre "+ txtGenero)
    console.log("Aqui está el nombre "+ txtanio)
    console.log("Aqui está el nombre "+ txtAutor)
    // Creo un objeto con los datos
    const anime = new Anime(nombre, txtGenero, txtanio,txtAutor);
    //Envio el objeto al metodo 
    animeService.insertarAnime(anime);
    //renderizado a la pagina anime, cargando los datos nuevamente
    res.render('anime',{
      titulo: 'ANIMES',
      arregloAnimes: animeService.leerTodoComoArreglo() // Aqui tengo el arreglo de animes
    });
  });


 



 

app.listen(8080);

console.log("╭─────‧°.ʕ•́ᴥ•̀ʔ.°‧─────≪");
console.log("♡ Camila Bañares Carrasco");
console.log("╰─────‧°.ʕ•́ᴥ•̀ʔ.°‧─────⌲");