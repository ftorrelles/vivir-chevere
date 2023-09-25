const db = require('../database/models/index');
const AppError = require('../utils/appError');

class Movement_itemsServices {
  async findAll() {
    const movement_items = await db.Movement_item.findAll({
      where: {
        status: true,
      },
      include: [{ model: db.Movement }],
    });
    return movement_items;
  }
  async create(movement_itemData) {
    return await db.Movement_item.create(movement_itemData);
  }

  async findOne(movement_itemId) {
    const movement_item = await db.Movement_item.findOne({
      where: {
        id: movement_itemId,
        status: true,
      },
      include: [{ model: db.Movement }],
    });
    if (!movement_item)
      throw new AppError(
        `Movement_item with id ${movement_itemId} not found`,
        404
      );
    return movement_item;
  }

  async update(movement_item, dataMovement_item) {
    return await movement_item.update(dataMovement_item);
  }

  async delete(movement_itemId) {
    const movement_item = await this.findOne(movement_itemId);
    return await movement_item.update({ status: false });
  }
}

module.exports = Movement_itemsServices;
