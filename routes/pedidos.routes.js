// Path /api/pedidos


const { Router } = require("express");

const {check} = require('express-validator');
const {getOrders, createOrders} = require('../controllers/pedidos.controllers')

const { validarCampos,FoodOrDrink } = require("../middlewares/validarCampos");

const router = Router();

router.get('/', getOrders)

router.post('/',
    check('food', 'la comida es requerida').not().isEmpty(),
    check('drinks', 'la bebida es requerida').not().isEmpty(),
    FoodOrDrink
,createOrders)


module.exports =  router