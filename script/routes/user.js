//Requerimos las variables para iniciar express
const express = require('express');
const userModel = require('../model/user');
const router = express.Router();
const { body } = require('express-validator');

//Creamos las rutas

router.get('/new', (req, res)=>{
    res.render('signUp');
});

//Login con google
router.get('/signInGoogle', (req, res)=>{
    userModel.loginGoogle();
});

//vista recovery contraseña
router.get('/recovery', (req, res)=>{
    res.render('recovery');
})

//Vista de verificación de password via email
router.post('/signIn', async (req, res)=>{
    const user = await userModel.loginWithEmail(req.body);
    
    res.cookie('x-access-token', user).send("Logueado");
});


//Ruta post para sign up, comprobando si coinciden las contraseñas
router.post('/signUp',body('repeatPassword').custom((value,{req})=>{
    if(value !== req.body.password){
        throw new Error("Las contraseñas no coinciden");
    }
    return true;
}), async (req, res)=>{
    await userModel.saveUser(req.body);
    res.send("Usuario guardado");
});

//Enviar correo
router.post('/recovery', async(req, res)=>{
    await userModel.recovery(req.body.email);
    res.send("Correo de recuperación enviado");
});


module.exports = router;