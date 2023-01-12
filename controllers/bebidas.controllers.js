const {request, response} = require('express')

const Bebidas = require('../models/bebidas')


// = async(req = request, res = response)=>{}

const addDrink = async(req = request, res = response)=>{
    const { name } = req.body

    try {

        const nameExists = await Bebidas.findOne({name})


        if(nameExists){
            return res.status(200).json({
                ok:false,
                msg:'Error ese nombre ya existe'
            })
        }

        const newDrink = new Bebidas(req.body)

        await newDrink.save()

        return res.status(200).json({
            ok:true,
            msg:'Nuevo producto creado',
            newDrink
        })
        
    } catch (error) {
        catchError(error, res)
    }
}

const callDrink = async(req = request, res = response)=>{
    try {

        const drinks = await Bebidas.find()

        return res.status(200).json({
            ok:true,
            drinks
        })
        
    } catch (error) {
        catchError(error, res)
    }
}

const deleteDrink= async(req = request, res = response)=>{
    try {
        const idDrink = req.params.id

        const drink = await Bebidas.findById(idDrink)

        if(!drink){
            return res.status(404).json({
                ok:false,
                msg:'no se puedo encontrar nada con esa id'
            })
        }

        await Bebidas.findByIdAndDelete(idDrink)

        return res.json({
            ok:true,
            msg: 'bebida eliminada'
        })
        
    } catch (error) {
        catchError(error,res)
    }
}

const upgradeDrink = async(req = request, res = response)=>{
    const idDrink = req.params.id

    try {
        
        const drink =  await Bebidas.findById(idDrink)

        const newChanges = req.body 

        if(!drink){
            return res.status(404).json({
                ok:false,
                msg:'no se encontro nada con esa id'
            })
        }

        if(drink.name !== newChanges.name){
            const name = newChanges.name
            const newName = await Bebidas.findOne({ name  });
            if ( newName ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una bebida con ese nombre'
                });
             }
        }

        const updatedDrink = await Bebidas.findByIdAndUpdate(idDrink, newChanges,{ new: true })


        return res.status(200).json({
            ok:true,
            msg:'bebida actualizada',
            food:updatedDrink
        })


    } catch (error) {
        catchError(error,res)
    }
}


const catchError = (error, res) =>{
    console.log(error)
    return res.status(404).json({
        ok:false,
        msg:'Error grave en la base comunicar al admin'
    }) 
}

module.exports= {
    addDrink,
    callDrink,
    deleteDrink,
    upgradeDrink
}