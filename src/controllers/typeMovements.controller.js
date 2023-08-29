const catchAsync = require('../utils/catchAsync');

const TypeMovementsServices = require('../services/typeMovements.services');
const typeMovementsServices = new TypeMovementsServices();

exports.findAll = catchAsync(async (req, res, next) => {
  const typeMovements = await typeMovementsServices.findAll();

  return res.status(200).json({
    status: 'success',
    results: typeMovements.length,
    typeMovements,
  });
});
exports.create = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const typeMovement = await typeMovementsServices.create({
    name,
  });
  return res.status(201).json({
    status: 'Success',
    message: 'the type Movement has benn created',
    typeMovement,
  });
});
exports.findOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const typeMovement = await typeMovementsServices.findOne(id);
  return res.status(200).json({
    status: 'Success',
    typeMovement,
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const typeMovement = await typeMovementsServices.findOne(id);
  const typeMovementUpdated = await typeMovementsServices.update(typeMovement, {
    name,
  });
  return res.status(200).json({
    status: 'Success',
    message: 'The type Movement has benn updated!',
    typeMovementUpdated,
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const typeMovementDeleted = await typeMovementsServices.delete(id);

  return res.status(204).json({
    status: 'Success',
    message: 'The type Movement has benn deleted!',
    typeMovementDeleted,
  });
});
