const {request, response} = require('express')

const Tables =  require('../models/mesas')


// = async (req= request, res = response)=>{}

const getTables = async (req= request, res = response)=>{

    try {

        allTable = await Tables.find()

        res.json({
            ok:true,
            Tables : allTable
        })
        
    } catch (error) {
        catchError(error, res)
    }

}

const createTables = async (req= request, res = response)=>{
    try {

        const body =  req.body

        const number = body.number

        const numberExists = await Tables.findOne({number})

        if(numberExists){
            return res.status(200).json({
                ok:false,
                msg:'Error esa mesa ya existe'
            })
        }

        newTable = new Tables(body)

        await newTable.save()

        return res.status(200).json({
            ok:true,
            msg:'Nueva mesa creada',
            newTable
        })
        
    } catch (error) {
        catchError(error, res)
    }
}

const upgradeTables = async (req= request, res = response)=>{
    const idTable = req.params.id
    try {

        const table = await Tables.findById(idTable)

        if(!table){
            return res.status(404).json({
                ok:false,
                msg:'no se encontro nada con esa id'
            })
        }

        const {password ='001', orders } = req.body

        const updatedTable = await Tables.findByIdAndUpdate(idTable, {password, orders},{ new: true })


        return res.status(200).json({
            ok:true,
            msg:'mesa actualizada',
            Table:updatedTable
        })
        
    } catch (error) {
        catchError(error, res)
    }
}
// Todo  : agregar pedidos a las mesas
// Todo  : limpiar las mesas
// Todo  : borrar las mesas



const catchError = (error, res) =>{
    console.log(error)
    return res.status(404).json({
        ok:false,
        msg:'Error grave en la base comunicar al admin'
    }) 
}




module.exports ={
    getTables,
    createTables,
    upgradeTables
}