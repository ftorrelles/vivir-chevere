const catchAsync = require('../utils/catchAsync');

const WarehousesServices = require('../services/warehouses.services');
const warehousesServices = new WarehousesServices();

exports.findAll = catchAsync(async (req, res, next) => {
  const warehouses = await warehousesServices.findAll();

  return res.status(200).json({
    status: 'success',
    results: warehouses.length,
    warehouses,
  });
});
exports.create = catchAsync(async (req, res, next) => {
  const { branch_id, product_id, quantity, status } = req.body;

  const warehouse = await warehousesServices.create({
    branch_id,
    product_id,
    quantity,
    status,
  });
  return res.status(201).json({
    status: 'Success',
    message: 'the warehouse has benn created',
    warehouse,
  });
});
exports.findOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const warehouse = await warehousesServices.findOne(id);
  return res.status(200).json({
    status: 'Success',
    warehouse,
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { branch_id, product_id, quantity, status } = req.body;

  const warehouse = await warehousesServices.findOne(id);
  const warehouseUpdated = await warehousesServices.update(warehouse, {
    branch_id,
    product_id,
    quantity,
    status,
  });
  return res.status(200).json({
    status: 'Success',
    message: 'The warehouse has benn updated!',
    warehouseUpdated,
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const warehouseDeleted = await warehousesServices.delete(id);

  return res.status(200).json({
    status: 'Success',
    message: 'The warehouse has benn deleted!',
    warehouseDeleted,
  });
});
