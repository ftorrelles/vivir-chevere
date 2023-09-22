const express = require('express');

const specificationsController = require('../controllers/specifications.controller');

const specificationRouter = express.Router();

specificationRouter
  .route('/')
  .get(specificationsController.findAll)
  .post(specificationsController.create);

specificationRouter
  .route('/:id')
  .get(specificationsController.findOne)
  .delete(specificationsController.delete)
  .patch(specificationsController.update);

module.exports = specificationRouter;
