const router = require('express').Router();
const UsersController = require('../controllers/users')
const controller = new UsersController()

router.post('/register', function(req, res) {
  controller.create(req, res);
});

router.post('/login', function(req, res) {
  controller.login(req, res, req.body.username, req.body.password);
});

module.exports = router;