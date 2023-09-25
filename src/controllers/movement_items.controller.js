const catchAsync = require('../utils/catchAsync');

const Movement_itemsServices = require('../services/movement_items.services');
const movement_itemsServices = new Movement_itemsServices();

exports.findAll = catchAsync(async (req, res, next) => {
  const movement_items = await movement_itemsServices.findAll();

  return res.status(200).json({
    status: 'success',
    results: movement_items.length,
    movement_items,
  });
});
exports.create = catchAsync(async (req, res, next) => {
  const { movementId, productId, quantity, total_line, status } = req.body;

  const movement_item = await movement_itemsServices.create({
    movementId,
    productId,
    quantity,
    total_line,
    status,
  });
  return res.status(201).json({
    status: 'Success',
    message: 'the movement_item has benn created',
    movement_item,
  });
});
exports.findOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movement_item = await movement_itemsServices.findOne(id);
  return res.status(200).json({
    status: 'Success',
    movement_item,
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { movementId, productId, quantity, total_line, status } = req.body;

  const movement_item = await movement_itemsServices.findOne(id);
  const movement_itemUpdated = await movement_itemsServices.update(
    movement_item,
    {
      movementId,
      productId,
      quantity,
      total_line,
      status,
    }
  );
  return res.status(200).json({
    status: 'Success',
    message: 'The movement_item has benn updated!',
    movement_itemUpdated,
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movement_itemDeleted = await movement_itemsServices.delete(id);

  return res.status(200).json({
    status: 'Success',
    message: 'The movement_item has benn deleted!',
    movement_itemDeleted,
  });
});
