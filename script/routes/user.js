//Requerimos las variables para iniciar express
const express = require('express');
const userModel = require('../model/user');
const router = express.Router();

//Creamos las rutas
router.get('/', (req, res)=>{
    res.send('user');
});

//Vista de verificación de password via email
router.post('/passwordEmail', (req, res)=>{
    res.send('login');
});






module.exports = router;