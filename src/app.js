const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const AppError = require('./utils/appError.js');
const globalErrorHandler = require('./controllers/error.controller');

const roleRouter = require('./routes/roles.routes.js');
const typeCustomerRouter = require('./routes/typeCustomers.routes.js');
const customerRouter = require('./routes/customers.routes.js');
const typeMovementRouter = require('./routes/typeMovements.routes.js');

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

app.all('*', (req, res, next) => {
  return next(
    new AppError(`can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
