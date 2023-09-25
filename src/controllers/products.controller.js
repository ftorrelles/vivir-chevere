const catchAsync = require('../utils/catchAsync');

const ProductsServices = require('../services/products.services');
const productsServices = new ProductsServices();

exports.findAll = catchAsync(async (req, res, next) => {
  const products = await productsServices.findAll();

  return res.status(200).json({
    status: 'success',
    results: products.length,
    products,
  });
});
exports.create = catchAsync(async (req, res, next) => {
  const {
    name,
    measure,
    specificationId,
    price_afiliate,
    price_general,
    status,
  } = req.body;

  const product = await productsServices.create({
    name,
    measure,
    specificationId,
    price_afiliate,
    price_general,
    status,
  });
  return res.status(201).json({
    status: 'Success',
    message: 'the product has benn created',
    product,
  });
});
exports.findOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await productsServices.findOne(id);
  return res.status(200).json({
    status: 'Success',
    product,
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    measure,
    specificationId,
    price_afiliate,
    price_general,
    status,
  } = req.body;

  const product = await productsServices.findOne(id);
  const productUpdated = await productsServices.update(product, {
    name,
    measure,
    specificationId,
    price_afiliate,
    price_general,
    status,
  });
  return res.status(200).json({
    status: 'Success',
    message: 'The product has benn updated!',
    productUpdated,
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const productDeleted = await productsServices.delete(id);

  return res.status(200).json({
    status: 'Success',
    message: 'The product has benn deleted!',
    productDeleted,
  });
});
