const Payment = require('./payment')
const secretKey = process.env.PG1;

class PGateway1 extends Payment {
    constructor() {
        super('p-gateway-1', secretKey, 'charges', 'transaction')
    }

    async partialReimburse(reimburseInfo) {
        try {
            await this.pGateway[this.reimburseCollecton].reimburse(reimburseInfo);
            return {success: true}
        } catch (err) {
            return err;
        }
    }
}

module.exports = new PGateway1();