const db = require('../database/models/index');
const AppError = require('../utils/appError');

class SpecificationsServices {
  async findAll() {
    const specifications = await db.Specification.findAll();
    return specifications;
  }
  async create(specificationData) {
    return await db.Specification.create(specificationData);
  }

  async findOne(specificationId) {
    const specification = await db.Specification.findOne({
      where: {
        id: specificationId,
      },
    });
    if (!specification)
      throw new AppError(`Author with id ${specificationId} not found`, 404);
    return specification;
  }

  async update(specification, dataSpecification) {
    return await specification.update(dataSpecification);
  }

  async delete(specificationId) {
    const specification = await this.findOne(specificationId);
    return await specification.destroy();
  }
}

module.exports = SpecificationsServices;
