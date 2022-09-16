const BaseController = require('./baseController');
const ProductModel = require('../models/product');

class ProductsController extends BaseController {
    constructor() {
        super(ProductModel)
    }
}

module.exports = ProductsController;