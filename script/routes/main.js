//Requerimos las variables para iniciar express
const express = require('express');
const router = express.Router();
const jwtValidator = require('../jwtValidator');

//Creamos las rutas
router.get('/', jwtValidator,(req, res)=>{
    res.render('main.ejs');
});




module.exports = router;