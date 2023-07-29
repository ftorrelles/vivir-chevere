const catchAsync = require('../utils/catchAsync');

const TypeCustomersServices = require('../services/typeCustomers.services');
const typeCustomersServices = new TypeCustomersServices();

exports.findAll = catchAsync(async (req, res, next) => {
  const typeCustomers = await typeCustomersServices.findAll();

  return res.status(200).json({
    status: 'success',
    results: typeCustomers.length,
    typeCustomers,
  });
});
exports.create = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const typeCustomer = await typeCustomersServices.create({
    name,
  });
  return res.status(201).json({
    status: 'Success',
    message: 'the type Customer has benn created',
    typeCustomer,
  });
});
exports.findOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const typeCustomer = await typeCustomersServices.findOne(id);
  return res.status(200).json({
    status: 'Success',
    typeCustomer,
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const typeCustomer = await typeCustomersServices.findOne(id);
  const typeCustomerUpdated = await typeCustomersServices.update(typeCustomer, {
    name,
  });
  return res.status(200).json({
    status: 'Success',
    message: 'The type Customer has benn updated!',
    typeCustomerUpdated,
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const typeCustomerDeleted = await typeCustomersServices.delete(id);

  return res.status(204).json({
    status: 'Success',
    message: 'The type Customer has benn deleted!',
    typeCustomerDeleted,
  });
});
