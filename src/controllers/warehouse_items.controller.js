const catchAsync = require('../utils/catchAsync');

const Warehouse_itemsServices = require('../services/warehouse_items.services');
const warehouse_itemsServices = new Warehouse_itemsServices();

exports.findAll = catchAsync(async (req, res, next) => {
  const warehouse_items = await warehouse_itemsServices.findAll();

  return res.status(200).json({
    status: 'success',
    results: warehouse_items.length,
    warehouse_items,
  });
});
exports.create = catchAsync(async (req, res, next) => {
  const { warehouseId, productId, quantity, status } = req.body;

  const warehouse_item = await warehouse_itemsServices.create({
    warehouseId,
    productId,
    quantity,
    status,
  });
  return res.status(201).json({
    status: 'Success',
    message: 'the warehouse_item has benn created',
    warehouse_item,
  });
});
exports.findOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const warehouse_item = await warehouse_itemsServices.findOne(id);
  return res.status(200).json({
    status: 'Success',
    warehouse_item,
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { warehouseId, productId, quantity, status } = req.body;

  const warehouse_item = await warehouse_itemsServices.findOne(id);
  const warehouse_itemUpdated = await warehouse_itemsServices.update(
    warehouse_item,
    {
      warehouseId,
      productId,
      quantity,
      status,
    }
  );
  return res.status(200).json({
    status: 'Success',
    message: 'The warehouse_item has benn updated!',
    warehouse_itemUpdated,
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const warehouse_itemDeleted = await warehouse_itemsServices.delete(id);

  return res.status(200).json({
    status: 'Success',
    message: 'The warehouse_item has benn deleted!',
    warehouse_itemDeleted,
  });
});
