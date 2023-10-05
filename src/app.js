const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const path = require('path');

// const AppError = require('./utils/AppError');
const AppError = require(path.join(__dirname, 'utils', 'AppError'));
const globalErrorHandler = require('./controllers/error.controller');

//inportacion routes
const roleRouter = require('./routes/roles.routes.js');
const typeCustomerRouter = require('./routes/typeCustomers.routes.js');
const customerRouter = require('./routes/customers.routes.js');
const typeMovementRouter = require('./routes/typeMovements.routes.js');
const specificationRouter = require('./routes/specifications.routes.js');
const productRouter = require('./routes/products.routes.js');
const branchRouter = require('./routes/branches.routes.js');
const warehouseRouter = require('./routes/warehouses.routes.js');
const cuenta_clienteRouter = require('./routes/cuenta_clientes.routes.js');
const movementRouter = require('./routes/movements.routes.js');
const movement_itemsRouter = require('./routes/movement_items.routes.js');

const app = express();

const limiter = rateLimit({
  max: 100000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in one hour!',
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(xss());
app.use(hpp());

app.use('/api/v1', limiter);

//rutas
app.use('/api/v1/roles', roleRouter);
app.use('/api/v1/typeCustomers', typeCustomerRouter);
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/typeMovements', typeMovementRouter);
app.use('/api/v1/specifications', specificationRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/branches', branchRouter);
app.use('/api/v1/warehouses', warehouseRouter);
app.use('/api/v1/cuenta_clientes', cuenta_clienteRouter);
app.use('/api/v1/movements', movementRouter);
app.use('/api/v1/movement_items', movement_itemsRouter);

// app.use('*', (req, res, next) => {
//   next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
// });

app.all('*', (req, res, next) => {
  return next(
    new AppError(`can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
