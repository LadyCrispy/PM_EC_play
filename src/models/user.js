const BaseModel = require('./baseModel');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const rounds = process.env.ROUNDS | 0;
const generateJWT = require('../modules/jwt')

class UserModel extends BaseModel {
    constructor() {
        super(
            'User',
            'users',
            {
                name: {
                    type: String,
                    required: [true, "can't be blank"]
                },
                surname: {
                    type: String,
                    required: [true, "can't be blank"]
                },
                username: {
                    type: String,
                    unique: true,
                    lowercase: true,
                    required: [true, "can't be blank"],
                    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
                    index: true
                },
                email: {
                    type: String,
                    unique: true,
                    required: [true, "can't be blank"],
                    match: [/\S+@\S+\.\S+/, 'is invalid'],
                    index: true
                },
                password: {
                    type: String,
                    required: [true, "can't be blank"],
                }
            }
        )

        this.modelSchema.plugin(uniqueValidator, { message: 'is already taken' });
        this.salt = bcrypt.genSaltSync(rounds);
    }

    async create(req, user) {
        user.password = bcrypt.hashSync(user.password, this.salt);
        const registeredUser = await this.model.create(user);
        if (registeredUser._doc) {
            const token = generateJWT(registeredUser._doc);
            return { token };
        }
    }

}

module.exports = new UserModel();
