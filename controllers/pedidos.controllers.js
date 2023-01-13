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

        return res.status(200).json({
            ok:true,
            msg: 'pedido creado',
            orders : newOrder
        })

        
    } catch (error) {
        catchError(error,res)
    }
}


const catchError = (error, res) =>{
    console.log(error)
    return res.status(404).json({
        ok:false,
        msg:'Error grabe en la base comunicar al admin'
    }) 
}


module.exports ={
    getOrders,
    createOrders
}