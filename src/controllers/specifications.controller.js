const catchAsync = require('../utils/catchAsync');

const SpecificationsServices = require('../services/specifications.services');
const specificationsServices = new SpecificationsServices();

exports.findAll = catchAsync(async (req, res, next) => {
  const specifications = await specificationsServices.findAll();

  return res.status(200).json({
    status: 'success',
    results: specifications.length,
    specifications,
  });
});
exports.create = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const specification = await specificationsServices.create({
    name,
  });
  return res.status(201).json({
    status: 'Success',
    message: 'the specification has benn created',
    specification,
  });
});
exports.findOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const specification = await specificationsServices.findOne(id);
  return res.status(200).json({
    status: 'Success',
    specification,
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const specification = await specificationsServices.findOne(id);
  const specificationUpdated = await specificationsServices.update(
    specification,
    {
      name,
    }
  );
  return res.status(200).json({
    status: 'Success',
    message: 'The specification has benn updated!',
    specificationUpdated,
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const specificationDeleted = await specificationsServices.delete(id);

  return res.status(204).json({
    status: 'Success',
    message: 'The specification has benn deleted!',
    specificationDeleted,
  });
});
