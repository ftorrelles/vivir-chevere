const db = require('../database/models/index');
const AppError = require('../utils/appError');

class Warehouse_itemsServices {
  async findAll() {
    const warehouse_items = await db.Warehouse_item.findAll({
      where: {
        status: true,
      },
      include: [{ model: db.Product }, { model: db.Warehouse }],
    });
    return warehouse_items;
  }
  async create(warehouse_itemData) {
    return await db.Warehouse_item.create(warehouse_itemData);
  }

  async findOne(warehouse_itemId) {
    const warehouse_item = await db.Warehouse_item.findOne({
      where: {
        id: warehouse_itemId,
        status: true,
      },
      include: [{ model: db.Product }, { model: db.Warehouse }],
    });
    if (!warehouse_item)
      throw new AppError(
        `Warehouse_item with id ${warehouse_itemId} not found`,
        404
      );
    return warehouse_item;
  }

  async update(warehouse_item, dataWarehouse_item) {
    return await warehouse_item.update(dataWarehouse_item);
  }

  async delete(warehouse_itemId) {
    const warehouse_item = await this.findOne(warehouse_itemId);
    return await warehouse_item.update({ status: false });
  }
}

module.exports = Warehouse_itemsServices;
