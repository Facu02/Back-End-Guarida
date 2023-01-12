// Ruta api/bebidas

const { Router } = require("express");
const {check} = require('express-validator');
const { addDrink ,callDrink,deleteDrink, upgradeDrink} = require("../controllers/bebidas.controllers");
const { validarCampos } = require("../middlewares/validarCampos");



const router = Router()

router.get('/', callDrink)

router.post('/', check('name','El nombre es obligatorio').not().isEmpty(),
check('price', 'El precio es obligatorio').not().isEmpty(),
validarCampos, 
addDrink)

router.put('/:id', upgradeDrink)

router.delete('/:id', deleteDrink)


module.exports = router

