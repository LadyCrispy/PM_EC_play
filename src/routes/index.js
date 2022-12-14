var router = require('express').Router();

router.get('/', function(req, res, next) {
  res.status(200).send({msg: 'Wellcome :) '})
});
router.use('/carts', require('./carts'))
router.use('/products', require('./products'))
router.use('/users', require('./users'))

module.exports = router;
