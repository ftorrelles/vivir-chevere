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

// Nueva ruta para encontrar cuentas por usuario y tipo de movimiento
warehousesRouter
  .route('/by-branch/:customerId')
  .get(warehousesController.findByBranch);

module.exports = warehousesRouter;
