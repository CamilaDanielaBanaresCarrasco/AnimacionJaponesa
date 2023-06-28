const express = require('express');
const animeService = require('./services/animeService');

const app = express(); //para utilizar express

//app.use(express.static('public'));

app.set('view engine', 'hbs');


//leerTodo()
const animes = animeService.leerTodoComoArreglo();
console.log(animes) //animes en un arreglo

app.get('/', (req,res) =>{
  res.render('anime',{
    titulo: 'ANIMES',
    arregloAnimes: animeService.leerTodoComoArreglo()
  });

});

 

app.listen(8080);

console.log("╭─────‧°.ʕ•́ᴥ•̀ʔ.°‧─────≪");
console.log("♡ Camila Bañares Carrasco");
console.log("╰─────‧°.ʕ•́ᴥ•̀ʔ.°‧─────⌲");