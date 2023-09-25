const db = require('../database/models/index');
const AppError = require('../utils/appError');

class WarehousesServices {
  async findAll() {
    const warehouses = await db.Warehouse.findAll({
      where: {
        status: true,
      },
      include: [{ model: db.Branch }],
    });
    return warehouses;
  }
  async create(warehouseData) {
    return await db.Warehouse.create(warehouseData);
  }

  async findOne(warehouseId) {
    const warehouse = await db.Warehouse.findOne({
      where: {
        id: warehouseId,
        status: true,
      },
      include: [{ model: db.Branch }],
    });
    if (!warehouse)
      throw new AppError(`Warehouse with id ${warehouseId} not found`, 404);
    return warehouse;
  }

  async update(warehouse, dataWarehouse) {
    return await warehouse.update(dataWarehouse);
  }

  async delete(warehouseId) {
    const warehouse = await this.findOne(warehouseId);
    return await warehouse.update({ status: false });
  }
}

module.exports = WarehousesServices;
