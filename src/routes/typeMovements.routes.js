const express = require('express');

const typeMovementsController = require('../controllers/typeMovements.controller');

const typeMovementRouter = express.Router();

typeMovementRouter
  .route('/')
  .get(typeMovementsController.findAll)
  .post(typeMovementsController.create);

typeMovementRouter
  .route('/:id')
  .get(typeMovementsController.findOne)
  .delete(typeMovementsController.delete)
  .patch(typeMovementsController.update);

module.exports = typeMovementRouter;
