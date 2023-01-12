
const {request, response} = require('express')

const Comida = require('../models/comida')



const callFood = async(req = request, res = response)=>{

    try {

        const foods = await Comida.find()


        return res.status(200).json({
            ok:true,
            foods
        })
        
    } catch (error) {
        catchError(error , res)
    }

}


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


    return res.status(200).json({
        ok:true,
        msg:'Nuevo producto creado',
        newFood
    })
    
    
} catch (error) {
    catchError(error , res)
}
}

const deleteFood = async (req = request, res = response) =>{

 try {
    const idFood = req.params.id


    const food =  await Comida.findById(idFood)

    if(!food){
        
        return res.status(404).json({
            ok:false,
            msg:'no se puedo encontrar nada con esa id'
        })
    }
    await Comida.findByIdAndDelete( idFood );

        
       return res.json({
            ok: true,
            msg: 'comida eliminada'
        });
    
 } catch (error) {
    return catchError(error , res)
 }



}

const upgradeFood = async (req = request, res = response) =>{

    const idFood = req.params.id

    try {

        const food =  await Comida.findById(idFood)

        const newChanges = req.body 

        
        if(!food){
            return res.status(404).json({
                ok:false,
                msg:'no se encontro nada con esa id'
            })
        }

        if(food.name !== newChanges.name){
            const name = newChanges.name
            const newName = await Comida.findOne({ name  });
            if ( newName ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una comida con ese nombre'
                });
             }
        }


        const updatedFood = await Comida.findByIdAndUpdate(idFood, newChanges,{ new: true })


        return res.status(200).json({
            ok:true,
            msg:'comida actualizada',
            food:updatedFood
        })



    } catch (error) {
        catchError(error, res)
    }


}

const lookForFood = async(name)=>{
    await Comida.findOne({name})
}

const catchError = (error, res) =>{
    console.log(error)
    return res.status(404).json({
        ok:false,
        msg:'Error grabe en la base comunicar al admin'
    }) 
}


module.exports={
    callFood,
    addFood,
    deleteFood,
    upgradeFood
}