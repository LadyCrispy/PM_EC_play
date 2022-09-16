const BaseModel = require('./baseModel');

class ProductModel extends BaseModel {
    constructor() {
        super(
            'Product',
            'products',
            {
                name: String,
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
