const { Schema, model } = require('mongoose')

const ComidaSchema = Schema({
    name:{
        type    :String,
        require :true
    },
    price:{
        type    :Number,
        require :true,
    },
    ingredients:{
        type    :[String],
        require :false
    },
    isVegan:{
        type    :Boolean,
        require :false,
        default : false
    },
    isVegetarian:{
        type    :Boolean,
        require :false,
        default :false
    }
    
})

module.exports = model('food', ComidaSchema)