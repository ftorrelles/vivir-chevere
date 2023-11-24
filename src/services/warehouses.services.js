const db = require('../database/models/index');
const AppError = require('../utils/AppError');

class WarehousesServices {
  async findAll() {
    const warehouses = await db.Warehouse.findAll({
      where: {
        status: true,
      },
      include: [
        { model: db.Branch },
        { model: db.Product, include: [{ model: db.Specification }] },
      ],
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
      include: [
        { model: db.Branch },
        { model: db.Product, include: [{ model: db.Specification }] },
      ],
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

  async findByBranchId(branchId) {
    const warehouse = await db.Warehouse.findOne({
      where: {
        branch_id: branchId,
        status: true, // Asegúrate de que el almacén esté activo
      },
    });
    if (!warehouse) {
      throw new AppError(
        `Warehouse for branch with id ${branchId} not found`,
        404
      );
    }
    return warehouse;
  }

  async updateQuantity(warehouseId, newQuantity) {
    const warehouse = await this.findOne(warehouseId);
    return await warehouse.update({ quantity: newQuantity });
  }

  async findByBranch(customerId) {
    const customer = await db.Customer.findOne({
      where: {
        id: customerId,
        status: true,
      },
      include: [{ model: db.Branch }],
    });
    if (!customer) {
      throw new AppError(`Customer with id ${customerId} not found`, 404);
    }
    const isAdmin = customer && customer.role_id === 3;
    const branch = customer?.Branches[0]?.id;
    if (!branch && !isAdmin) {
      throw new AppError(`Customer with id ${customerId} without branch`, 404);
    }
    let fiteredWarehouse;
    if (isAdmin) {
      fiteredWarehouse = await db.Warehouse.findAll({
        where: {
          status: true,
        },
      });
    } else {
      fiteredWarehouse = await db.Warehouse.findAll({
        where: {
          branch_id: branch,
          status: true,
        },
      });
    }
    return fiteredWarehouse;
  }
}

module.exports = WarehousesServices;
