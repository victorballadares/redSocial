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

//Vista para cerrar sesión
router.get('/logout', (req, res)=>{
    userModel.logout();
    res.clearCookie('user_info').redirect('/');
})

//Vista de verificación de password via email
router.post('/signIn', async (req, res)=>{
    const user = await userModel.loginWithEmail(req.body);
    
    
    const jsonValue = JSON.stringify({
        'x-access-token': user.token,
        'uid' : user.uid,
        'firstName' : user.firstName,
        'lastName' : user.lastName,
        'email' : user.email
      });
    
      res.cookie(
        'user_info',
        jsonValue,
        {
          expires: new Date(Date.now() + 2 * 604800000),
          path: '/'
        }
      ).redirect('/main');
});


//Ruta post para sign up, comprobando si coinciden las contraseñas
router.post('/signUp',body('repeatPassword').custom((value,{req})=>{
    if(value !== req.body.password){
        throw new Error("Las contraseñas no coinciden");
    }
    return true;
}), async (req, res)=>{
    await userModel.saveUser(req.body);
    res.render("templates/message",{message:'Saved user.'});
});

//Enviar correo
router.post('/recovery', async(req, res)=>{
    await userModel.recovery(req.body.email);
    res.render("templates/message",{message:'A password recovery email has been sent.'});
});


module.exports = router;