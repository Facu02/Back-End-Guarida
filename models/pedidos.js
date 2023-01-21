const { Schema, model } = require('mongoose')

const PedidosSchema = Schema({
    food:{
        type: [Schema.Types.ObjectId],
        ref: 'food'
    },
    drinks:{
        type: [Schema.Types.ObjectId],
        ref: 'drinks'
    },

})

PedidosSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('orders', PedidosSchema)