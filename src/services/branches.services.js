const db = require('../database/models/index');
const AppError = require('../utils/appError');

class BranchesServices {
  async findAll() {
    const branches = await db.Branch.findAll({
      where: {
        status: true,
      },
      include: [{ model: db.Customer }],
    });
    return branches;
  }
  async create(brachData) {
    return await db.Branch.create(brachData);
  }

  async findOne(branchId) {
    const branch = await db.Branch.findOne({
      where: {
        id: branchId,
        status: true,
      },
      include: [{ model: db.Customer }],
    });
    if (!branch)
      throw new AppError(`Branch with id ${branchId} not found`, 404);
    return branch;
  }

  async update(branch, dataBranch) {
    return await branch.update(dataBranch);
  }

  async delete(branchId) {
    const branch = await this.findOne(branchId);
    return await branch.update({ status: false });
  }
}

module.exports = BranchesServices;
