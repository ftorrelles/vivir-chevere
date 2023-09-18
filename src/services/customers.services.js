const { Op } = require('sequelize');
const db = require('../database/models/index');
const AppError = require('../utils/appError');

class CustomersServices {
  async findAll(firstName, lastName, identificationDocument) {
    const where = {};
    if (firstName) where.firstName = { [Op.iLike]: `%${firstName}%` };
    if (lastName) where.lastName = { [Op.iLike]: `%${lastName}%` };
    if (identificationDocument)
      where.identificationDocument = identificationDocument;
    where.status = {
      [Op.eq]: true,
    };
    const customers = await db.Customer.findAll({
      include: [
        { model: db.TypeCustomer, as: 'typeCustomer' },
        { model: db.Role },
      ],
      where,
    });

    return customers;
  }

  async create(customerData) {
    return await db.Customer.create(customerData);
  }

  async findOne(customerId) {
    const customer = await db.Customer.findOne({
      where: {
        id: customerId,
        status: true,
      },
      include: [
        { model: db.TypeCustomer, as: 'typeCustomer' },
        { model: db.Role, as: 'Role' }, // Asegúrate de que el nombre del modelo y el alias coincidan con tu definición de modelo
      ],
    });
    if (!customer)
      throw new AppError(`Author with id ${customerId} not found`, 404);
    return customer;
  }

  async findByEmail(email) {
    return await db.Customer.findOne({
      where: { email },
      include: [
        { model: db.TypeCustomer, as: 'typeCustomer' },
        { model: db.Role },
      ],
    });
  }

  async update(customerId, dateCustomer) {
    const customer = await db.Customer.findOne({
      where: { id: Number(customerId) },
    });
    if (!customer)
      throw new AppError(`Customer with id ${customerId} not found`, 404);

    return await customer.update(dateCustomer);
  }

  async updatePasswordByEmail(email, newPassword) {
    const customer = await this.findByEmail(email);
    if (!customer) {
      throw new AppError(`Customer with email ${email} not found`, 404);
    }

    return await customer.update({ password: newPassword });
  }

  async delete(customerId) {
    // const customer = await this.findOne(customerId);
    // return await customer.destroy();
    const customer = await this.findOne(customerId);
    return await customer.update({ status: false });
  }
}

module.exports = CustomersServices;
