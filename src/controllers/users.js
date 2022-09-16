const BaseController = require('./baseController');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt')
const generateJWT = require('../modules/jwt')

class UsersController extends BaseController {
    constructor() {
        super(UserModel)
    }

    async login(req, res, username, pwd) {
        try {
            const user = await this.controller.model.findOne({ username });
            if (!user) {
                return res.status(400).send('User not found')
            }

            const isValidPwd = bcrypt.compareSync(pwd, user.password)
            if (!isValidPwd) {
                return res.status(400).send('Incorrect password')
            }
            const token = generateJWT(user)
            return res.status(200).send({msg: token})
        } catch (err) {
            return res.status(500).send({msg: err.message})
        }
    }
}

module.exports = UsersController;