//Requerimos las variables para iniciar express
const express = require('express');
const router = express.Router();
const jwtValidator = require('../jwtValidator');

//Creamos las rutas
router.get('/', jwtValidator,(req, res)=>{
    res.send('main');
});


module.exports = router;