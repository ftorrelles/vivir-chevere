const db = require('../database/models/index');
const AppError = require('../utils/AppError');

class ProductsServices {
  async findAll() {
    const products = await db.Product.findAll({
      where: {
        status: true,
      },
      include: [{ model: db.Specification }, { model: db.Warehouse }],
    });
    return products;
  }
  async create(productData) {
    return await db.Product.create(productData);
  }

  async findOne(productId) {
    const product = await db.Product.findOne({
      where: {
        id: productId,
        status: true,
      },
      include: [{ model: db.Specification }],
    });
    if (!product)
      throw new AppError(`Product with id ${productId} not found`, 404);
    return product;
  }

  async update(product, dataProduct) {
    return await product.update(dataProduct);
  }

  async delete(productId) {
    const product = await this.findOne(productId);
    return await product.update({ status: false });
  }
}

module.exports = ProductsServices;
