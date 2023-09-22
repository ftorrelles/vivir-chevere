const express = require('express');

const branchesController = require('../controllers/branches.controller');
// const validationsMiddleware = require('./../middlewares/validations.middleware');

const branchRouter = express.Router();

branchRouter
  .route('/')
  .get(branchesController.findAll)
  .post(branchesController.create);

branchRouter
  .route('/:id')
  .get(branchesController.findOne)
  .delete(branchesController.delete)
  .patch(branchesController.update);

module.exports = branchRouter;
