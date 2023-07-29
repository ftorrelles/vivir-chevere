const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const customersController = require('../controllers/customers.controller');

const customerRouter = express.Router();

customerRouter
  .route('/')
  .get(verifyJWT, customersController.findAll)
  .post(customersController.create);

customerRouter.route('/verify/:code').get(customersController.verifyEmail);

customerRouter.route('/login').post(customersController.login);

customerRouter.route('/me').get(verifyJWT, customersController.getLoggedUser);

customerRouter
  .route('/:id')
  .get(verifyJWT, customersController.findOne)
  .delete(verifyJWT, customersController.delete)
  .patch(verifyJWT, customersController.update);

module.exports = customerRouter;
