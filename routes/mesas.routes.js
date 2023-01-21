// path /api/mesas

const {Router} =  require("express")
const {check} = require('express-validator');

const { getTables ,createTables, upgradeTables} = require('../controllers/mesas.controllers')
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router()




router.get('/', getTables)

router.post('/', 
check('number', 'El numero de mesa es obligatorio').isNumeric().not().isEmpty(),
validarCampos,
createTables
)

router.put('/:id',upgradeTables)



module.exports = router