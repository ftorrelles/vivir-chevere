const catchAsync = require('../utils/catchAsync');

const MovementsServices = require('../services/movements.services');
const movementsServices = new MovementsServices();

const Movement_itemsServices = require('../services/movement_items.services');
const movement_itemsServices = new Movement_itemsServices();

const WarehousesServices = require('../services/warehouses.services');
const warehousesServices = new WarehousesServices();

const CustomersServices = require('../services/customers.services');
const customerServices = new CustomersServices();

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

    // Crear los objetos movement_items y asignar el movimiento_id al mismo tiempo si es un producto afiliador lo afilia
    const createdMovementItems = await Promise.all(
      movement_items.map(async (item) => {
        const { product_id, quantity, total_line, status } = item;
        // console.log(product_id);
        // Verificar si es un producto afiliador y si es una compra
        if (product_id == 25 && typemovement_id == 1) {
          //colocar el id de los productos que afilian
          // Primero, asegúrate de que el cliente exista
          const customer = await customerServices.findOne(customer_id);
          // console.log(customer.id);
          const isAfiliate = customer.type_customer_id === 1;
          if (!isAfiliate) {
            // si no es afiliado actualizar su tipo de cliente a afiliado
            await customerServices.update(customer.id, { type_customer_id: 1 });
          } else {
            // Si ya es afiliado genera una nueva fila en la tabla customer, este sera un codigo para afiliar (disponible para que afilie desde la oficina virtual)
            for (let i = 0; i < quantity; i++) {
              const code = Date.now();
              await customerServices.create({
                first_name: `codigo#${code}`,
                last_name: `codigo#${code}`,
                identification_document: code,
                email: `${code}@referido.com`,
                phone: `${code}`,
                birthdate: '1954-10-31',
                type_customer_id: 3,
                role_id: 1,
                password: `${code}`,
                ref: customer.id,
                user_name: `${code}`,
                status: false,
              });
            }
          }
        }
        // Luego, crea el objeto movement_items
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

    // calcular cuenta por cobrar y por pagar de sede (Cuenta sede)
    if (typemovement_id == 1) {
      // Calcular cuenta por pagar sede restando el 15% al total
      const cuentaPorPagar = total * 0.85;
      // Calcular cuenta por cobrar sede el 15% al total
      const cuentaPorCobrar = total * 0.15;

      // Crear un registro en la tabla cuenta_clientes de la cuenta por pagar de la sede
      await db.Cuenta_cliente.create({
        typemovement_id: 5,
        customer_id: dispatcher_id, // El dueño de la sede
        ingreso: cuentaPorPagar,
        egreso: 0,
        status: true,
        movement_id: movementId,
      });
      // Crear un registro en la tabla cuenta_clientes de la cuenta por cobrar de la sede
      await db.Cuenta_cliente.create({
        typemovement_id: 6,
        customer_id: dispatcher_id, // El dueño de la sede
        ingreso: cuentaPorCobrar,
        egreso: 0,
        status: true,
        movement_id: movementId,
      });
    }
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
