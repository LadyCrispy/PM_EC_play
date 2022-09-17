const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

/**
 * 
 * @param {Object} user 
 * @param {string} user._id 
 * @param {string} user.username 
 * @returns 
 */
const generateJWT = (user) => {
    const now = new Date();
    const expire = new Date(now);
    expire.setDate(now.getDate() + 60);

    return jwt.sign({
        id: user._id,
        username: user.username,
        exp: parseInt(expire.getTime()),
    }, secret);
};

module.exports = generateJWT