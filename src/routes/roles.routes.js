const express = require('express');

const rolesController = require('../controllers/roles.controller');

const roleRouter = express.Router();

roleRouter.route('/').get(rolesController.findAll).post(rolesController.create);

roleRouter
  .route('/:id')
  .get(rolesController.findOne)
  .delete(rolesController.delete)
  .patch(rolesController.update);

module.exports = roleRouter;
