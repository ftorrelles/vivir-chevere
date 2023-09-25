const catchAsync = require('../utils/catchAsync');

const BranchesServices = require('../services/branches.services');
const branchesServices = new BranchesServices();

exports.findAll = catchAsync(async (req, res, next) => {
  const branches = await branchesServices.findAll();

  return res.status(200).json({
    status: 'success',
    results: branches.length,
    branches,
  });
});
exports.create = catchAsync(async (req, res, next) => {
  const { name, city, neighborhood, customerId, status } = req.body;

  const branch = await branchesServices.create({
    name,
    city,
    neighborhood,
    customerId,
    status,
  });
  return res.status(201).json({
    status: 'Success',
    message: 'the branch has benn created',
    branch,
  });
});
exports.findOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const branch = await branchesServices.findOne(id);
  return res.status(200).json({
    status: 'Success',
    branch,
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, city, neighborhood, customerId, status } = req.body;

  const branch = await branchesServices.findOne(id);
  const branchUpdated = await branchesServices.update(branch, {
    name,
    city,
    neighborhood,
    customerId,
    status,
  });
  return res.status(200).json({
    status: 'Success',
    message: 'The branch has benn updated!',
    branchUpdated,
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const branchDeleted = await branchesServices.delete(id);

  return res.status(200).json({
    status: 'Success',
    message: 'The branch has benn deleted!',
    branchDeleted,
  });
});
