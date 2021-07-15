const Brand = require('../models/Brand');
const { hasNull } = require('../utils/hasNull');

module.exports = {
    async save(req, res) {
        if (!req.isAdmin)
            return res.status(403).send({ msg: 'forbidden' });

        if (hasNull(req.body, ['name']))
            return res.status(400).send({ msg: 'missing required data' });

        const { name } = req.body;

        try {
            const result = await Brand.create({ name });
            return res.status(200).send(result);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ msg: 'internal server error' });
        }
    },

    async list(req, res) {
        try {
            const result = await Brand.findAll();

            if (result.length === 0)
                return res.status(404).send({ msg: 'not found' });

            return res.status(200).send(result);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ msg: 'internal server error' });
        }
    },

    async edit(req, res) {
        if (!req.isAdmin)
            return res.status(403).send({ msg: 'forbidden' });

        if (hasNull(req.params, ['id_brand']))
            return res.status(400).send({ msg: 'missing required data' });

        const { id_brand } = req.params
        const { name } = req.body;
        try {

            const brand = await Brand.findByPk(id_brand)

            if (!brand)
                return res.status(404).send({ msg: 'not found' });

            await brand.update({ name });

            return res.status(200).send(brand);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ msg: 'internal server error' });
        }

    },


    async delete(req, res) {
        if (!req.isAdmin)
            return res.status(403).send({ msg: 'forbidden' });

        if (hasNull(req.params, ['id_brand']))
            return res.status(400).send({ msg: 'missing required data' });

        const { id_brand } = req.params

        try {
            const brand = await Brand.findByPk(id_brand)

            if (!brand)
                return res.status(404).send({ msg: 'not found' });

            await brand.destroy();

            return res.status(200).send({ msg: 'brand deleted' });

        } catch (error) {
            console.log(error);
            return res.status(500).send({ msg: 'internal server error' });
        }
    }
}