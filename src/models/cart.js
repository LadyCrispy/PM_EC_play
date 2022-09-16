const mongoose = require('mongoose');
const BaseModel = require('./baseModel');

class CartModel extends BaseModel {
    constructor() {
        super(
            'Cart',
            'carts',
            {
                items: [{
                    _id: mongoose.Schema.Types.ObjectId,
                    product: String,
                    quantity: Number,
                    totalAmount: Number,
                    currency: {
                        type: String,
                        default: 'eur',
                        enum: ['eur']
                    }
                }],
                user:{
                    type:  mongoose.Schema.Types.ObjectId,
                    unique: true,
                    required: true
                },
                currency: {
                    type: String,
                    default: 'eur',
                    enum: ['eur']
                }
            }
        )
    }
}

module.exports = new CartModel();
