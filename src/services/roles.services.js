const db = require('../database/models/index');
const AppError = require('../utils/appError');

class RolesServices {
  async findAll() {
    const roles = await db.Role.findAll();
    return roles;
  }
  async create(roleData) {
    return await db.Role.create(roleData);
  }

  async findOne(roleId) {
    const role = await db.Role.findOne({
      where: {
        id: roleId,
      },
    });
    if (!role) throw new AppError(`Author with id ${roleId} not found`, 404);
    return role;
  }

  async update(role, dataRole) {
    return await role.update(dataRole);
  }

  async delete(roleId) {
    const role = await this.findOne(roleId);
    return await role.destroy();
  }
}

module.exports = RolesServices;
