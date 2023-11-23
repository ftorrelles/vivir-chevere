const express = require('express');

const cuenta_clientesController = require('../controllers/cuenta_clientes.controller');
// const validationsMiddleware = require('./../middlewares/validations.middleware');

const cuenta_clienteRouter = express.Router();

cuenta_clienteRouter
  .route('/')
  .get(cuenta_clientesController.findAll)
  .post(cuenta_clientesController.create);

cuenta_clienteRouter
  .route('/:id')
  .get(cuenta_clientesController.findOne)
  .delete(cuenta_clientesController.delete)
  .patch(cuenta_clientesController.update);

// Nueva ruta para encontrar cuentas por usuario y tipo de movimiento
cuenta_clienteRouter
  .route('/:customerId/:typeMovementId')
  .get(cuenta_clientesController.findByUserAndType);

module.exports = cuenta_clienteRouter;
