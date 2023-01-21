const {request, response} = require('express')
const Orders = require('../models/pedidos')

// async (req= request, res = response)=>{}

const getOrders = async (req= request, res = response)=>{

    try {
       const allOrders = await Orders.find()

        res.json({
            ok:true,
            orders:allOrders
        })

    } catch (error) {
        catchError(error,res)
    }

}

const createOrders = async (req= request, res = response)=>{
    try {
        const body = req.body 


        newOrder = new Orders(body)

        newOrder.save()

        return res.status(200).json({
            ok:true,
            msg: 'pedido creado',
            orders : newOrder
        })

        
    } catch (error) {
        catchError(error,res)
    }
}


const upgrateOrders = async (req= request, res = response)=>{


    const idOrder = req.params.id
    const body = req.body

    if(validateId(idOrder,res)){
        return res.status(404).json({
            ok:false,
            msg: 'Id no valido'
        })
    }

    try {

        const order = await Orders.findById(idOrder)

        if(!order){
            return res.status(404).json({
                ok:false,
                msg:'No se encontro nada con esa id'
            })
        }

        orderUpdate = await Orders.findByIdAndUpdate(idOrder,body,{ new: true })

        return res.json({
            ok:true,
            msg:'pedido actualizado',
            orderUpdate

        })

        
    } catch (error) {
        catchError(error,res)
    }
}

const deleteOrders =async (req= request, res = response)=>{
    const idOrder = req.params.id
    if(validateId(idOrder,res)){
        return res.status(404).json({
            ok:false,
            msg: 'Id no valido'
        })
    }

    try {

        const order = await Orders.findById(idOrder)

        if(!order){
            return res.status(404).json({
                ok:false,
                msg:'No se encontro nada con esa id'
            })
        }

        await Orders.findByIdAndDelete(idOrder)

        return res.json({
            ok: true,
            msg: 'Orden eliminada'
        });
        
    } catch (error) {
        catchError(error, res)
    }
}

const validateId=(idOrder,res)=>{
    if(!idOrder || idOrder.length < 24) return true
    else return false
}


const catchError = (error, res) =>{
    console.log(error)
    return res.status(404).json({
        ok:false,
        msg:'Error grave en la base comunicar al admin'
    }) 
}


module.exports ={
    getOrders,
    createOrders,
    upgrateOrders,
    deleteOrders
}