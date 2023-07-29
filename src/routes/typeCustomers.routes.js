const express = require('express');

const typeCustomersController = require('../controllers/typeCustomers.controller');

const typeCustomerRouter = express.Router();

typeCustomerRouter
  .route('/')
  .get(typeCustomersController.findAll)
  .post(typeCustomersController.create);

typeCustomerRouter
  .route('/:id')
  .get(typeCustomersController.findOne)
  .delete(typeCustomersController.delete)
  .patch(typeCustomersController.update);

module.exports = typeCustomerRouter;
