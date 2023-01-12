const { Schema, model } = require('mongoose')


const BebidasSchema = Schema({
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
})

BebidasSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('drinks', BebidasSchema)