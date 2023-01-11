// Ruta /api/comida

const { Router } = require("express");
const { addFood } = require("../controllers/comida.controllers");

const {check} = require('express-validator');
const { validarCampos } = require("../middlewares/validarCampos");


const router = Router();

router.post('/' ,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('price', 'El precio es obligatorio').not().isEmpty(),
    check('ingredients','Los ingredientes son obligatorios').not().isEmpty(),
    validarCampos
    ,addFood
)



module.exports =  router

