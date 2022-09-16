const router = require('express').Router();
const ProductsController = require('../controllers/products')
const controller = new ProductsController()
const isAuth = require('../modules/auth')

router.get('/', function(req, res) {
  controller.find(req, res, req.query, req.projection);
});

router.post('/create', isAuth, function(req, res) {
  controller.create(req, res);
});

router.put('/updateById', isAuth, function(req, res) {
  controller.updateById(req, res);
});

router.delete('/deleteById', isAuth, function(req, res) {
  controller.deleteById(req, res);
});

module.exports = router;