const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
});

module.exports = mongoose.model('Cart', CartSchema);
