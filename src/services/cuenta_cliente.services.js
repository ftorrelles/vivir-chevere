const db = require('../database/models/index');
const AppError = require('../utils/AppError');

class Cuenta_clientesServices {
  async findAll() {
    const cuenta_clientes = await db.Cuenta_cliente.findAll({
      where: {
        status: true,
      },
      include: [
        { model: db.Customer, include: [{ model: db.Branch }] },
        { model: db.Type_movement },
      ],
    });
    return cuenta_clientes;
  }
  async create(cuenta_clienteData) {
    return await db.Cuenta_cliente.create(cuenta_clienteData);
  }

  async findOne(cuenta_clienteId) {
    const cuenta_cliente = await db.Cuenta_cliente.findOne({
      where: {
        id: cuenta_clienteId,
        status: true,
      },
      include: [{ model: db.Customer }, { model: db.Type_movement }],
    });
    if (!cuenta_cliente)
      throw new AppError(
        `Cuenta_cliente with id ${cuenta_clienteId} not found`,
        404
      );
    return cuenta_cliente;
  }

  async update(cuenta_cliente, dataCuenta_cliente) {
    return await cuenta_cliente.update(dataCuenta_cliente);
  }

  async delete(cuenta_clienteId) {
    const cuenta_cliente = await this.findOne(cuenta_clienteId);
    return await cuenta_cliente.update({ status: false });
  }

  async findByUserAndType(customerId, typeMovementId) {
    const customer = await db.Customer.findOne({
      where: {
        id: customerId,
        status: true,
      },
    });
    if (!customer) {
      throw new AppError(`Customer with id ${customerId} not found`, 404);
    }
    const isAdmin = customer && customer.role_id === 3;
    const whereClause = {
      status: true,
    };
    if (!isAdmin) {
      whereClause.customer_id = customerId;
    }
    if (typeMovementId) {
      whereClause.typemovement_id = typeMovementId;
    }
    const cuenta_clientes = await db.Cuenta_cliente.findAll({
      where: whereClause,
      include: [
        {
          model: db.Customer,
          include: [{ model: db.Branch }],
        },
        {
          model: db.Movement,
          include: [{ model: db.Customer, as: 'customer' }],
        },
      ],
    });
    return cuenta_clientes;
  }
}

module.exports = Cuenta_clientesServices;
