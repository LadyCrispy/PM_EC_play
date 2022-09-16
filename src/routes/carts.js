const router = require('express').Router();
const CartsController = require('../controllers/carts')
const controller = new CartsController()
const isAuth = require('../modules/auth')
const CartModel = require('../models/cart')

router.get('/', isAuth, function (req, res) {
  controller.find(req, res, {user: CartModel.objectId(req.user._id)});
});

router.post('/create', isAuth, function (req, res) {
  controller.create(req, res, req.body);
});

router.post('/buy', isAuth, function (req, res) {
  controller.buy(req, res, req.body);
});

// router.put('/updateById', isAuth, function (req, res) {
//   controller.updateById(req, res);
// });

// router.delete('/empty', isAuth, function (req, res) {
//   controller.deleteById(req, res);
// });

module.exports = router;