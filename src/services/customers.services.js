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
      },
    });
    if (!customer)
      throw new AppError(`Author with id ${customerId} not found`, 404);
    return customer;
  }

  async findByEmail(email) {
    return await db.Customer.findOne({ where: { email } });
  }

  async update(customerId, dateCustomer) {
    const customer = await db.Customer.findOne({ where: { id: customerId } });
    if (!customer)
      throw new AppError(`Customer with id ${customerId} not found`, 404);

    return await customer.update(dateCustomer);
  }

  async delete(customerId) {
    const customer = await this.findOne(customerId);
    return await customer.destroy();
  }
}

module.exports = CustomersServices;

// const { Op } = require('sequelize');
// const db = require('../database/models/index');
// const AppError = require('../utils/appError');

// class CustomersServices {
//   async findAll(firstName, lastName, identificationDocument) {
//     const where = {};
//     if (firstName) where.firstName = { [Op.iLike]: `%${firstName}%` };
//     if (lastName) where.lastName = { [Op.iLike]: `%${lastName}%` };
//     if (identificationDocument)
//       where.identificationDocument = identificationDocument;

//     const customers = await db.Customer.findAll({
//       include: [
//         { model: db.TypeCustomer, as: 'typeCustomer' },
//         { model: db.Role },
//       ],
//       where,
//     });

//     return customers;
//   }

//   async create(customerData) {
//     return await db.Customer.create(customerData);
//   }

//   async findOne(customerId) {
//     const customer = await db.Customer.findOne({
//       where: {
//         id: customerId,
//       },
//     });
//     if (!customer)
//       throw new AppError(`Author with id ${customerId} not found`, 404);
//     return customer;
//   }

//   async update(customer, dateCustomer) {
//     return await customer.update(dateCustomer);
//   }

//   async delete(customerId) {
//     const customer = await this.findOne(customerId);
//     return await customer.destroy();
//   }
// }

// module.exports = CustomersServices;
