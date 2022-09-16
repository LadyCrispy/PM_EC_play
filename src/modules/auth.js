const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const isAuth = async (req, res, next) => {
    try {
        let token = req?.headers?.authorization;
        if (!token) {
            return res.status(400).send({ msg: 'Please login to access the data' });
        }

        if (token.includes('Bearer ') > 0) {
            token = token.split(' ')[1]
        }

        const decodedToken = await jwt.verify(token, secret);
        if (decodedToken.exp <= Date.now()) {
            return res.status(400).send({ msg: 'Your session has expired' })
        }

        req.user = {
            _id: decodedToken.id,
            username: decodedToken.username,
        }
        next();
    } catch (err) {
        return res.status(500).send({ msg: err.message });
    }
}

module.exports = isAuth;