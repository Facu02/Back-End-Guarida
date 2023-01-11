
const {request, response} = require('express')

const Comida = require('../models/comida')
const { busquedaComida } = require('../server/express')




const addFood= async (req = request, res = response)=>{
    const { name } = req.body
try {
    
    const nameExists =  await lookForFood(name)

    if(nameExists){
        return res.status(200).json({
            ok:false,
            msg:'Error ese nombre ya existe'
        }) 
    }
    const newFood = new Comida(req.body)

    await newFood.save()

    busquedaComida()

    return res.status(200).json({
        ok:true,
        msg:'Nuevo producto creado',
        newFood
    })
    
    
} catch (error) {
    console.log(error)
    return res.status(404).json({
        ok:false,
        msg:'Error grabe en la base comunicar al admin'
    }) 
}
}

const lookForFood = async(name)=>{
    await Comida.findOne({name})
}

module.exports={
    addFood
}