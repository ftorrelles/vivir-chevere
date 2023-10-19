const catchAsync = require('../utils/catchAsync');

const MovementsServices = require('../services/movements.services');
const movementsServices = new MovementsServices();

const Movement_itemsServices = require('../services/movement_items.services');
const movement_itemsServices = new Movement_itemsServices();

const WarehousesServices = require('../services/warehouses.services');
const warehousesServices = new WarehousesServices();

const db = require('../database/models');

exports.findAll = catchAsync(async (req, res, next) => {
  const movements = await movementsServices.findAll();

  return res.status(200).json({
    status: 'success',
    results: movements.length,
    movements,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  try {
    // Extraer datos del movimiento del cuerpo de la solicitud
    const {
      movement_date,
      description,
      typemovement_id,
      customer_id,
      branch_id,
      dispatcher_id,
      total,
      status,
      movement_items, // Nuevos datos para los items del movimiento
    } = req.body;

    // Crear el movimiento en la base de datos
    const movement = await movementsServices.create({
      movement_date,
      description,
      typemovement_id,
      customer_id,
      branch_id,
      dispatcher_id,
      total,
      status,
    });

    // Obtener el ID del movimiento creado
    const movementId = movement.id;

    // Crear los objetos movement_items y asignar el movimiento_id
    const createdMovementItems = await Promise.all(
      movement_items.map(async (item) => {
        const { product_id, quantity, total_line, status } = item;
        return await movement_itemsServices.create({
          movement_id: movementId,
          product_id,
          quantity,
          total_line,
          status,
        });
      })
    );

    // Actualizar la cantidad de productos en el almacén correspondiente
    await Promise.all(
      movement_items.map(async (item) => {
        const { product_id, quantity } = item;

        // Buscar el almacén correspondiente al producto y a la sucursal (branch) del movimiento
        const warehouse = await db.Warehouse.findOne({
          where: {
            branch_id,
            product_id,
          },
        });
        //logica para sumar o restar el almacen cambiar segun necesidad
        if (
          typemovement_id == 1 ||
          typemovement_id == 3 ||
          typemovement_id == 4
        ) {
          const updatedQuantity =
            Number(warehouse?.quantity) - Number(quantity);
          return await warehousesServices.update(warehouse, {
            branch_id,
            product_id,
            quantity: updatedQuantity,
            status: 'true',
          });
        } else {
          const updatedQuantity =
            Number(warehouse?.quantity) + Number(quantity);
          return await warehousesServices.update(warehouse, {
            branch_id,
            product_id,
            quantity: updatedQuantity,
            status: 'true',
          });
        }
      })
    );

    return res.status(201).json({
      status: 'Success',
      message:
        'El movimiento y los items de movimiento se han creado con éxito',
      movement,
      movement_items: createdMovementItems,
    });
  } catch (error) {
    next(error);
  }
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movement = await movementsServices.findOne(id);
  return res.status(200).json({
    status: 'Success',
    movement,
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {
    movement_date,
    description,
    typemovement_id,
    customer_id,
    branch_id,
    dispatcher_id,
    total,
    status,
  } = req.body;

  const movement = await movementsServices.findOne(id);
  const movementUpdated = await movementsServices.update(movement, {
    movement_date,
    description,
    typemovement_id,
    customer_id,
    branch_id,
    dispatcher_id,
    total,
    status,
  });
  return res.status(200).json({
    status: 'Success',
    message: 'The movement has benn updated!',
    movementUpdated,
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movementDeleted = await movementsServices.delete(id);

  return res.status(200).json({
    status: 'Success',
    message: 'The movement has benn deleted!',
    movementDeleted,
  });
});
