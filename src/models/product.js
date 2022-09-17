const BaseModel = require('./baseModel');

class ProductModel extends BaseModel {
    constructor() {
        super(
            'Product',
            'products',
            {
                name: { 
                    type: String,
                    unique: true,
                    required: [true, "can't be blank"]
                },
                price: Number,
                currency: {
                    type: String,
                    default: 'eur',
                    enum: ['eur']
                }
            }
        )
    }
}

module.exports = new ProductModel();
