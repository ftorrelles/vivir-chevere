const { body, validationResult } = require('express-validator');

exports.validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.CreateCustomerValidations = [
  body('firstName').notEmpty().withMessage('firstName cannot be empty'),
  body('lastName').notEmpty().withMessage('lastName cannot be empty'),
  body('identificationDocument')
    .notEmpty()
    .withMessage('identificationDocument cannot be empty'),
  body('email').notEmpty().withMessage('email cannot be empty'),
  body('phone').notEmpty().withMessage('phone cannot be empty'),
  body('birthdate').notEmpty().withMessage('birthdate cannot be empty'),

  this.validateFields,
];
