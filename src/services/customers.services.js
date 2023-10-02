const { Op } = require('sequelize');
const db = require('../database/models/index');
const AppError = require('../utils/appError');

class CustomersServices {
  async findAll(first_name, last_name, identification_document) {
    const where = {};
    if (first_name) where.first_name = { [Op.iLike]: `%${first_name}%` };
    if (last_name) where.last_name = { [Op.iLike]: `%${last_name}%` };
    if (identification_document)
      where.identification_document = identification_document;
    where.status = {
      [Op.eq]: true,
    };
    const customers = await db.Customer.findAll({
      include: [{ model: db.TypeCustomer }, { model: db.Role }],
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
        { model: db.TypeCustomer },
        { model: db.Role }, // Asegúrate de que el nombre del modelo y el alias coincidan con tu definición de modelo
      ],
    });
    if (!customer)
      throw new AppError(`Customer with id ${customerId} not found`, 404);
    return customer;
  }

  async findByEmail(email) {
    return await db.Customer.findOne({
      where: { email },
      include: [{ model: db.TypeCustomer }, { model: db.Role }],
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
