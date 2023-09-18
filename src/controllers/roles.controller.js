const catchAsync = require('../utils/catchAsync');

const RolesServices = require('../services/roles.services');
const rolesServices = new RolesServices();

exports.findAll = catchAsync(async (req, res, next) => {
  const roles = await rolesServices.findAll();

  return res.status(200).json({
    status: 'success',
    results: roles.length,
    roles,
  });
});
exports.create = catchAsync(async (req, res, next) => {
  const { name_role } = req.body;

  const role = await rolesServices.create({
    name_role,
  });
  return res.status(201).json({
    status: 'Success',
    message: 'the role has benn created',
    role,
  });
});
exports.findOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const role = await rolesServices.findOne(id);
  return res.status(200).json({
    status: 'Success',
    role,
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name_role } = req.body;

  const role = await rolesServices.findOne(id);
  const roleUpdated = await rolesServices.update(role, {
    name_role,
  });
  return res.status(200).json({
    status: 'Success',
    message: 'The role has benn updated!',
    roleUpdated,
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const roleDeleted = await rolesServices.delete(id);

  return res.status(204).json({
    status: 'Success',
    message: 'The role has benn deleted!',
    roleDeleted,
  });
});
