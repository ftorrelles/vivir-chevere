const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const customersController = require('../controllers/customers.controller');
const validationsMiddleware = require('./../middlewares/validations.middleware');

const customerRouter = express.Router();

customerRouter
  .route('/')
  .get(verifyJWT, customersController.findAll)
  .post(
    validationsMiddleware.CreateCustomerValidations,
    customersController.create
  );

customerRouter.route('/verify/:code').get(customersController.verifyEmail);

customerRouter.route('/login').post(customersController.login);

customerRouter
  .route('/sendrecoveryemail')
  .post(customersController.sendPasswordRecoveryEmail);

customerRouter
  .route('/reset-password/:code')
  .patch(customersController.resetPassword);

customerRouter.route('/me').get(verifyJWT, customersController.getLoggedUser);

customerRouter
  .route('/:id')
  .get(verifyJWT, customersController.findOne)
  .delete(verifyJWT, customersController.delete)
  .patch(customersController.update);

module.exports = customerRouter;
