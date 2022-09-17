const BaseController = require('./baseController');
const CartModel = require('../models/cart');
const OrderModel = require('../models/order');
const ProductModel = require('../models/product');
const payments = require('../modules/payment/index');

class CartsController extends BaseController {
    constructor() {
        super(CartModel)
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {Object} body 
     * @returns 
     */
    async create(req, res, body) {
        const items = body.items;
        if (!items) {
            res.status(400).send({ msg: 'It seems that there are no products to include' })
        }

        try {
            const products = await ProductModel.find(req, { _id: { $in: items.map(item => ProductModel.objectId(item.product)) } })
            const processedItems = items.map(item => {
                const product = products.find(prod => prod._id.toString() === item.product)
                item._id = CartModel.objectId(item.product);
                item.product = product.name;
                item.totalAmount = product.price * item.quantity;
                return item;
            })
            const cart = {
                user: CartModel.objectId(req.user._id),
                items: processedItems,
            }

            await CartModel.create(req, cart);
            res.status(200).send({ msg: 'Cart created' });
        } catch (err) {
            return res.status(500).send({ msg: err.message })
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {Object} body 
     * @returns 
     */
    async buy(req, res, body) {
        const { cartId, paymentMethod } = body;
        try {
            let cart = await CartModel.find(req, { _id: CartModel.objectId(cartId) });
            if (!cart[0]) {
                return res.status(404).send({ msg: 'This cart no longer exists' });
            }

            cart = cart[0];

            if (cart.user.toString() !== req.user._id) {
                return res.status(400).send({ msg: `It seems that cart ${cartId} is not yours` })
            }

            const cartTotal = cart.items.map(item => item.totalAmount).reduce((currVal, prevVal) => currVal + prevVal, 0);
            const paymentInfo = {
                card: paymentMethod.card,
                amount: cartTotal,
                currency: cart.currency,
                customer: req.user._id
            }

            let gateway;
            switch (paymentMethod.type) {
                case 'p-gateway-1':
                    gateway = payments.PGateway1;
                    break;
                case 'p-gateway-2':
                    gateway = payments.PGateway2;
                    break;
                default:
                    return res.status(500).send({ msg: `${paymentMethod.type} is not available. Please contact our team.` })
                    break;
            }

            const payment = await gateway.pay(paymentInfo);
            if (!payment.success) {
                res.status(500).send({ msg: 'Something went wrong, please try again in a few minutes' });
            }
            const order = {
                items: cart.items,
                customer: OrderModel.objectId(paymentInfo.customer),
                paymentId: payment._id,
                pGateway: paymentMethod.type,
                card: paymentMethod.card,
                amount: cartTotal,
                currency: cart.currency
            }
            await OrderModel.create(req, order);
            await CartModel.delete(req, { _id: cart._id });
            res.status(200).send({ msg: 'Order succesfully paid.' })
        } catch (err) {
            res.status(500).send({ msg: err.message })
        }

    }
}

module.exports = CartsController;