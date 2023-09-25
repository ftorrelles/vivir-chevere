const express = require('express');

const warehousesController = require('../controllers/warehouses.controller');
// const validationsMiddleware = require('./../middlewares/validations.middleware');

const warehousesRouter = express.Router();

warehousesRouter
  .route('/')
  .get(warehousesController.findAll)
  .post(warehousesController.create);

warehousesRouter
  .route('/:id')
  .get(warehousesController.findOne)
  .delete(warehousesController.delete)
  .patch(warehousesController.update);

module.exports = warehousesRouter;
