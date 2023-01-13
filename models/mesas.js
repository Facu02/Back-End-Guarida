const { Schema, model } = require('mongoose')


const MesasSchema = Schema({

    number:{
        type    :Number,
        require :true
    },
    password:{
        type:String
    },
    orders:{
        type: Schema.Types.ObjectId,
        ref: 'orders'
    },
    available:{
        type:Boolean,
        default:false
    }

})

MesasSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('table', MesasSchema)