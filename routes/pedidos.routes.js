// Path /api/pedidos


const { Router } = require("express");

const {check} = require('express-validator');
const {getOrders, createOrders, upgrateOrders, deleteOrders} = require('../controllers/pedidos.controllers')

const { validarCampos,FoodOrDrink } = require("../middlewares/validarCampos");

const router = Router();

router.get('/', getOrders)

router.post('/',
    check('food', 'comida o bebida es requerida').not().isEmpty(),
    check('food', 'la comida tiene que ser un array').isArray(),
    check('drinks', 'comida o bebida es requerida').not().isEmpty(),
    check('drinks', 'la bebida debe ser un array').isArray(),
    FoodOrDrink
,createOrders)

router.put('/:id', upgrateOrders)

router.delete('/:id', deleteOrders)


module.exports =  router