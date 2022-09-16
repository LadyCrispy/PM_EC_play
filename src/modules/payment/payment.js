const mongoose = require('mongoose');
class Payment {
    constructor(pGatewayImportName, clientSecret, payCollection, reimburseCollection) {
        this.payCollection = payCollection;
        this.reimburseCollection = reimburseCollection;
        this.pGateway = require('./' + pGatewayImportName);
        this.pGateway.configure({
            'client_secret': clientSecret
        });
    }

    async pay() {
        try {
            await this.pGateway[this.payCollection].pay
            return { success: true, _id: mongoose.Types.ObjectId() }
        } catch (err) {
            return err;
        }
    }

    async reimburse() {
        try {
            await this.pGateway[this.reimburseCollecton].reimburse;
            return { success: true }
        } catch (err) {
            return err;
        }
    }
}

module.exports = Payment;