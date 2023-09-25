const express = require('express');

const movementsController = require('../controllers/movement_items.controller');
// const validationsMiddleware = require('./../middlewares/validations.middleware');

const movementRouter = express.Router();

movementRouter
  .route('/')
  .get(movementsController.findAll)
  .post(movementsController.create);

movementRouter
  .route('/:id')
  .get(movementsController.findOne)
  .delete(movementsController.delete)
  .patch(movementsController.update);

module.exports = movementRouter;
