//Requerimos las variables para iniciar express
const express = require('express');
const router = express.Router();

//Creamos las rutas
router.get('/', (req, res)=>{
    res.send('main');
});


module.exports = router;