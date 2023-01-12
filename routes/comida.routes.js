// Ruta /api/comida

const { Router } = require("express");
const { addFood, callFood, deleteFood, upgradeFood } = require("../controllers/comida.controllers");

const {check} = require('express-validator');
const { validarCampos } = require("../middlewares/validarCampos");


const router = Router();

router.get('/', callFood )

router.post('/' ,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('price', 'El precio es obligatorio').not().isEmpty(),
    check('ingredients','Los ingredientes son obligatorios').not().isEmpty(),
    validarCampos
    ,addFood
)

router.delete('/:id',deleteFood)

router.put('/:id',upgradeFood)



module.exports =  router

