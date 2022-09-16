const mongoose = require('mongoose');
const BaseModel = require('./baseModel');

class OrderModel extends BaseModel {
    constructor() {
        super(
            'Order',
            'orders',
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
                customer: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
                },
                paymentId: {
                    type: mongoose.Schema.Types.ObjectId,
                    unique: true,
                    required: true
                },
                pGateway: {
                    type: String,
                    required: true
                },
                card: {
                    type: String,
                    required: true
                },
                amount: {
                    type: Number,
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

module.exports = new OrderModel();
