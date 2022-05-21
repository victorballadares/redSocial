//Requerimos las variables para iniciar express
const express = require('express');
const router = express.Router();
const userModel = require('../model/user');
const jwtValidator = require('../jwtValidator');
const multer = require('multer')({
    dest: 'public/files'
})
const fs = require('fs')
const path = require('path')

//Creamos las rutas
router.get('/', jwtValidator,(req, res)=>{
    res.render('main.ejs');
});

//Ruta de publicación
router.get('/publish', jwtValidator,(req, res)=>{
    res.render('publish.ejs');
});

//ruta post de publicación
router.post('/publish',[multer.single('fname')],async (req,res)=>{
    await userModel.publish(req);
    res.send('publish');

});


module.exports = router;