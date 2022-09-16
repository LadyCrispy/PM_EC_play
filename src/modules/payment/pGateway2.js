const Payment = require('./payment')
const secretKey = process.env.PG2;

class PGateway2 extends Payment {
    constructor() {
        super('p-gateway-2', secretKey, 'payments', 'refunds')
    }
}

module.exports = new PGateway2();