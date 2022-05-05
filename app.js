//Requerimos las variables para iniciar express
const express = require('express');
const app = express();
const index = require('./script/routes/index');
const user = require('./script/routes/user');
const main = require('./script/routes/main');


//Establecemos el motor de vistas ejs
app.set('view engine', 'ejs');


//Rutas
app.use('',index);
app.use('/user',user );
app.use('/main', main);



//Abrimos el puerto
app.listen(3000, ()=>{
    console.log('Servidor corriendo');
});

