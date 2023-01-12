const { Schema, model } = require('mongoose')

const PedidosSchema = Schema({
    comida:{
        type: Schema.Types.ObjectId,
        ref: 'food'
    },
    bebidas:{
        type: Schema.Types.ObjectId,
        ref: 'drinks'
    },
})

PedidosSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('orders', PedidosSchema)