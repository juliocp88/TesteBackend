const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

let product = new Schema({
    productId: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, 
{ versionKey: false }
).plugin(mongoosePaginate);

module.exports = mongoose.model('product', product);