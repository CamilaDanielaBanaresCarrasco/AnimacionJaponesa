const express = require('express');
const animeService = require('./services/animeService');

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


app.get('/formularioInsertarAnime', (req, res) => {
  res.render('formularioInsertarAnime');
});




app.get('/insertarAnime', (req, res) => {
  console.log(req.query.txtIdentificador, req.query.txtNombreDeCompania, req.query.txtNombreDeContacto);
  // Falta la lógica de programación
  res.render('anime',{
    titulo: 'ANIMES',
    arregloAnimes: animeService.leerTodoComoArreglo() // Aqui tengo el arreglo de animes
  });
});

 

app.listen(8080);

console.log("╭─────‧°.ʕ•́ᴥ•̀ʔ.°‧─────≪");
console.log("♡ Camila Bañares Carrasco");
console.log("╰─────‧°.ʕ•́ᴥ•̀ʔ.°‧─────⌲");