const express = require('express');

const productsController = require('../controllers/products.controller');
// const validationsMiddleware = require('./../middlewares/validations.middleware');

const productRouter = express.Router();

productRouter
  .route('/')
  .get(productsController.findAll)
  .post(productsController.create);

productRouter
  .route('/:id')
  .get(productsController.findOne)
  .delete(productsController.delete)
  .patch(productsController.update);

module.exports = productRouter;
