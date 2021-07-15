const express = require('express');
const routes = express.Router();
const multer = require('multer');
const UserController = require('./Controllers/UserController');
const ProductController = require('./Controllers/ProductController');
const BrandController = require('./Controllers/BrandController');
const authMiddleware = require('./middlewares/auth');
const multerConfig = require('./middlewares/multerConfig');

routes.get('/', (req, res) => {
    return res.status(200).json('Api da trilha de backend');
});

routes.post('/login', UserController.login);
routes.post('/users', UserController.save);
routes.get('/users', authMiddleware, UserController.list);
routes.put('/users', authMiddleware, UserController.edit);
routes.delete('/users', authMiddleware, UserController.delete);

routes.post('/products', authMiddleware, multer(multerConfig).single('image'), ProductController.save);
routes.get('/products', ProductController.list);
routes.put('/products/:id_product', authMiddleware, multer(multerConfig).single('image'), ProductController.edit);
routes.delete('/products/:id_product', authMiddleware, ProductController.delete);

routes.post('/brands', authMiddleware, BrandController.save);
routes.get('/brands', BrandController.list);
routes.put('/brands/:id_brand', authMiddleware, BrandController.edit);
routes.delete('/brands/:id_brand', authMiddleware, BrandController.delete);

module.exports = routes;