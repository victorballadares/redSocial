//Requerimos las variables para iniciar express
const express = require('express');
const app = express();
const index = require('./script/routes/index');
const user = require('./script/routes/user');
const main = require('./script/routes/main');
const {body,validationResult} = require('express-validator'); 
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('morgan');





//Establecemos el motor de vistas ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Rutas
app.use('',index);
app.use('/user',user );
app.use('/main', main);


//Abrimos el puerto
app.listen(3000, ()=>{
    console.log('Servidor corriendo');
});

