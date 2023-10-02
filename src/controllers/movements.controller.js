const catchAsync = require('../utils/catchAsync');

const MovementsServices = require('../services/movements.services');
const movementsServices = new MovementsServices();

exports.findAll = catchAsync(async (req, res, next) => {
  const movements = await movementsServices.findAll();

  return res.status(200).json({
    status: 'success',
    results: movements.length,
    movements,
  });
});
exports.create = catchAsync(async (req, res, next) => {
  const {
    movement_date,
    description,
    typemovement_id,
    customer_id,
    branch_id,
    dispatcher_id,
    total,
    status,
  } = req.body;

  const movement = await movementsServices.create({
    movement_date,
    description,
    typemovement_id,
    customer_id,
    branch_id,
    dispatcher_id,
    total,
    status,
  });
  return res.status(201).json({
    status: 'Success',
    message: 'the movement has benn created',
    movement,
  });
});
exports.findOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movement = await movementsServices.findOne(id);
  return res.status(200).json({
    status: 'Success',
    movement,
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {
    movement_date,
    description,
    typemovement_id,
    customer_id,
    branch_id,
    dispatcher_id,
    total,
    status,
  } = req.body;

  const movement = await movementsServices.findOne(id);
  const movementUpdated = await movementsServices.update(movement, {
    movement_date,
    description,
    typemovement_id,
    customer_id,
    branch_id,
    dispatcher_id,
    total,
    status,
  });
  return res.status(200).json({
    status: 'Success',
    message: 'The movement has benn updated!',
    movementUpdated,
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movementDeleted = await movementsServices.delete(id);

  return res.status(200).json({
    status: 'Success',
    message: 'The movement has benn deleted!',
    movementDeleted,
  });
});
