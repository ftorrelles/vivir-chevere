const db = require('../database/models/index');
const AppError = require('../utils/appError');

class TypeCustomersServices {
  async findAll() {
    const typeCustomers = await db.TypeCustomer.findAll();
    return typeCustomers;
  }
  async create(typeCustomerData) {
    return await db.TypeCustomer.create(typeCustomerData);
  }

  async findOne(typeCustomerId) {
    const typeCustomer = await db.TypeCustomer.findOne({
      where: {
        id: typeCustomerId,
      },
    });
    if (!typeCustomer)
      throw new AppError(`Author with id ${typeCustomerId} not found`, 404);
    return typeCustomer;
  }

  async update(typeCustomer, dataTypeCustomer) {
    return await typeCustomer.update(dataTypeCustomer);
  }

  async delete(typeCustomerId) {
    const typeCustomer = await this.findOne(typeCustomerId);
    return await typeCustomer.destroy();
  }
}

module.exports = TypeCustomersServices;
