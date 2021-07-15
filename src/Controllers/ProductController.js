const Product = require('../models/Product');
const Brand = require('../models/Brand');
const { deleteFile } = require('../utils/file');
const { hasNull } = require('../utils/hasNull');

module.exports = {
    async save(req, res) {
        if (!req.isAdmin) {
            if (req.file)
                deleteFile(req.file.key);
            return res.status(403).send({ msg: 'forbidden' });
        }

        if (hasNull(req.body, ['id_brand', 'name', 'price', 'category'])) {
            if (req.file)
                deleteFile(req.file.key);
            return res.status(400).send({ msg: 'missing required data' });
        }

        const { name, price, description, category, id_brand } = req.body;

        try {
            const brand = await Brand.findByPk(id_brand);

            if (!brand) {
                if (req.file)
                    deleteFile(req.file.key);
                return res.status(404).send({ msg: 'not found' });
            }

            let product;
            if (req.file)
                product = await Product.create({
                    name,
                    price,
                    description,
                    image_uri: `${process.env.API_URL}/images/${req.file.key}`,
                    category,
                    id_brand
                });
            else
                product = await Product.create({ name, price, description, category, id_brand })


            return res.status(200).send(product)

        } catch (error) {
            if (req.file)
                deleteFile(req.file.key);
            console.log(error);
            return res.status(500).send({ msg: 'internal server error' });
        }

    },


    async list(req, res) {

        if (hasNull(req.query, ['limit', 'page']))
            return res.status(400).send({ msg: 'missing required data' });

        const { id_brand, category, limit, page } = req.query;

        let query = {
            where: {},
            limit: parseInt(limit),
            offset: (page - 1) * limit,
            include: { association: 'brand' }
        };

        if (id_brand)
            query.where.id_brand = parseInt(id_brand);

        if (category)
            query.where.category = category;

        try {
            console.log(query);
            const products = await Product.findAll(query);

            if (products.length === 0)
                return res.status(404).send({ msg: 'not found' });

            return res.status(200).send(products);

        } catch (error) {
            console.log(error);
            return res.status(500).send({ msg: 'internal server error' });
        }
    },


    async edit(req, res) {

        if (hasNull(req.params, ['id_product'])) {
            if (req.file)
                deleteFile(req.file.key);
            return res.status(400).send({ msg: 'missing required data' });
        }

        const { id_product } = req.params;

        const { name, price, description, category, id_brand } = req.body;

        try {
            const product = await Product.findByPk(id_product);

            if (!product) {
                if (req.file)
                    deleteFile(req.file.key);
                return res.status(404).send({ msg: 'not found' });
            }

            if (id_brand) {
                const brand = await Brand.findByPk(id_brand);
                if (!brand) {
                    if (req.file)
                        deleteFile(req.file.key);
                    return res.status(404).send({ msg: 'not found' });
                }
            }

            if (req.file) {
                if (product.image_uri) {
                    const filename = product.image_uri.split('/images/')[1];
                    deleteFile(filename);
                }

                await product.update({
                    name,
                    price,
                    description,
                    image_uri: `${process.env.API_URL}/images/${req.file.key}`,
                    category,
                    id_brand
                });
            }
            else
                await product.update({ name, price, description, category, id_brand });

            return res.status(200).send(product);

        } catch (error) {
            if (req.file)
                deleteFile(req.file.key);
            console.log(error);
            return res.status(500).send({ msg: 'internal server error' });
        }

    },

    async delete(req, res) {
        if (hasNull(req.params, ['id_product']))
            return res.status(400).send({ msg: 'missing required data' });

        const { id_product } = req.params;

        try {
            const product = await Product.findByPk(id_product);

            if (!product)
                return res.status(404).send({ msg: 'not found' });

            if (product.image_uri) {
                const filename = product.image_uri.split('/images/')[1];
                deleteFile(filename);
            }

            await product.destroy()

            return res.status(200).send({ msg: 'product deleted' });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ msg: 'internal server error' });
        }
    }
}