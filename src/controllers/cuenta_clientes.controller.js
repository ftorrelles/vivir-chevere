const catchAsync = require('../utils/catchAsync');

const Cuenta_clientesServices = require('../services/cuenta_cliente.services');
const cuenta_clientesServices = new Cuenta_clientesServices();

exports.findAll = catchAsync(async (req, res, next) => {
  const cuenta_clientes = await cuenta_clientesServices.findAll();

  return res.status(200).json({
    status: 'success',
    results: cuenta_clientes.length,
    cuenta_clientes,
  });
});
exports.create = catchAsync(async (req, res, next) => {
  const { typemovement_id, customer_id, ingreso, egreso, status } = req.body;

  const cuenta_cliente = await cuenta_clientesServices.create({
    typemovement_id,
    customer_id,
    ingreso,
    egreso,
    status,
  });
  return res.status(201).json({
    status: 'Success',
    message: 'the cuenta_cliente has benn created',
    cuenta_cliente,
  });
});
exports.findOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const cuenta_cliente = await cuenta_clientesServices.findOne(id);
  return res.status(200).json({
    status: 'Success',
    cuenta_cliente,
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { typemovement_id, customer_id, ingreso, egreso, status } = req.body;

  const cuenta_cliente = await cuenta_clientesServices.findOne(id);
  const cuenta_clienteUpdated = await cuenta_clientesServices.update(
    cuenta_cliente,
    {
      typemovement_id,
      customer_id,
      ingreso,
      egreso,
      status,
    }
  );
  return res.status(200).json({
    status: 'Success',
    message: 'The cuenta_cliente has benn updated!',
    cuenta_clienteUpdated,
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const cuenta_clienteDeleted = await cuenta_clientesServices.delete(id);

  return res.status(200).json({
    status: 'Success',
    message: 'The cuenta_cliente has benn deleted!',
    cuenta_clienteDeleted,
  });
});
