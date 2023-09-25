const express = require('express');

const warehouse_itemsController = require('../controllers/warehouse_items.controller');
// const validationsMiddleware = require('./../middlewares/validations.middleware');

const warehouse_itemRouter = express.Router();

warehouse_itemRouter
  .route('/')
  .get(warehouse_itemsController.findAll)
  .post(warehouse_itemsController.create);

warehouse_itemRouter
  .route('/:id')
  .get(warehouse_itemsController.findOne)
  .delete(warehouse_itemsController.delete)
  .patch(warehouse_itemsController.update);

module.exports = warehouse_itemRouter;
