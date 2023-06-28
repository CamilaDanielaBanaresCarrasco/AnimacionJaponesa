const express = require('express');
const animeService = require('./services/animeService');

const app = express(); //para utilizar express

app.use(express.static('public'));

//leerTodo()
const animes = animeService.leerTodo();
console.log(animes); // Tengo los datos de animes
 

app.listen(8080);

console.log("╭─────‧°.ʕ•́ᴥ•̀ʔ.°‧─────≪");
console.log("♡ Camila Bañares Carrasco");
console.log("╰─────‧°.ʕ•́ᴥ•̀ʔ.°‧─────⌲");