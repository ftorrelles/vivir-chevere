const db = require('../database/models/index');
const AppError = require('../utils/appError');

class TypeMovementsServices {
  async findAll() {
    const typeMovements = await db.Type_movement.findAll();
    return typeMovements;
  }
  async create(typeMovementData) {
    return await db.Type_movement.create(typeMovementData);
  }

  async findOne(typeMovementId) {
    const typeMovement = await db.Type_movement.findOne({
      where: {
        id: typeMovementId,
      },
    });
    if (!typeMovement)
      throw new AppError(`Author with id ${typeMovementId} not found`, 404);
    return typeMovement;
  }

  async update(typeMovement, dataTypeMovement) {
    return await typeMovement.update(dataTypeMovement);
  }

  async delete(typeMovementId) {
    const typeMovement = await this.findOne(typeMovementId);
    return await typeMovement.destroy();
  }
}

module.exports = TypeMovementsServices;
