const db = require('../database/models/index');
const AppError = require('../utils/AppError');

class MovementsServices {
  async findAll() {
    const movements = await db.Movement.findAll({
      where: {
        status: true,
      },
      include: [
        { model: db.Customer, as: 'customer' },
        { model: db.Customer, as: 'dispatcher' },
        { model: db.Type_movement },
        { model: db.Branch },
        { model: db.Movement_item, include: [{ model: db.Product }] },
      ],
    });
    return movements;
  }
  async create(movementsData) {
    return await db.Movement.create(movementsData);
  }

  async findOne(movementId) {
    const movement = await db.Movement.findOne({
      where: {
        id: movementId,
        status: true,
      },
      include: [
        { model: db.Customer },
        { model: db.Type_movement },
        { model: db.Movement_item, include: [{ model: db.Product }] },
      ],
    });
    if (!movement)
      throw new AppError(`Movement with id ${movementId} not found`, 404);
    return movement;
  }

  async update(movement, dataMovement) {
    return await movement.update(dataMovement);
  }

  async delete(movementId) {
    const movement = await this.findOne(movementId);
    return await movement.update({ status: false });
  }
}

module.exports = MovementsServices;
