const { Schema, model } = require('mongoose')

const ComidaSchema = Schema({
    name:{
        type    :String,
        require :true
    },
    img:{
        type:String
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

ComidaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('food', ComidaSchema)