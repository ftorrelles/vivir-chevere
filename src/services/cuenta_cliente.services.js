const db = require('../database/models/index');
const AppError = require('../utils/appError');

class Cuenta_clientesServices {
  async findAll() {
    const cuenta_clientes = await db.cuenta_cliente.findAll({
      where: {
        status: true,
      },
      include: [{ model: db.Customer }, { model: db.Type_movement }],
    });
    return cuenta_clientes;
  }
  async create(cuenta_clienteData) {
    return await db.cuenta_cliente.create(cuenta_clienteData);
  }

  async findOne(cuenta_clienteId) {
    const cuenta_cliente = await db.cuenta_cliente.findOne({
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
}

module.exports = Cuenta_clientesServices;