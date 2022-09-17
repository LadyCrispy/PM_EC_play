class BaseController {
    constructor(controller) {
        this.controller = controller;
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {Object} query 
     * @param {Object} projection 
     * @returns 
     */
    async find(req, res, query, projection) {
        try {
            const docs = await this.controller.find(req, query, projection)
            return res.status(200).send(docs)
        } catch (err) {
            return res.status(500).send({ msg: err.message })
        }
    }

    async create(req, res) {
        const body = req.body;
        try {

            if (Array.isArray(body)) {
                const doc = await this.controller.createMany(req, body)
                return res.status(200).send({ msg: `${this.controller.name}s created.` })
            }

            const doc = await this.controller.create(req, body)
            return res.status(200).send({ msg: `${this.controller.name} created.` })
        } catch (err) {
            return res.status(500).send({ msg: err.message })
        }

    }

    async updateById(req, res) {
        const { _id, updateInfo } = req.body;
        if (!updateInfo) {
            return res.status(500).send({ msg: 'Update info is required to perform an update' })
        }

        try {
            const doc = await this.controller.update(req, { _id: this.controller.objectId(_id) }, updateInfo)
            return res.status(200).send({ msg: `${this.controller.name} updated.` })
        } catch (err) {
            return res.status(500).send({ msg: err.message })
        }
    }

    async deleteById(req, res) {
        const _id = req.body._id;
        try {
            const doc = await this.controller.delete(req, { _id: this.controller.objectId(_id) })
            return res.status(200).send({ msg: `${this.controller.name} deleted.` })
        } catch (err) {
            return res.status(500).send({ msg: err.message })
        }
    }
}

module.exports = BaseController;