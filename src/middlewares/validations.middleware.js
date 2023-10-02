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
  body('first_name').notEmpty().withMessage('first_name cannot be empty'),
  body('last_name').notEmpty().withMessage('last_name cannot be empty'),
  body('identification_document')
    .notEmpty()
    .withMessage('identification_document cannot be empty'),
  body('email').notEmpty().withMessage('email cannot be empty'),
  body('phone').notEmpty().withMessage('phone cannot be empty'),
  body('birthdate').notEmpty().withMessage('birthdate cannot be empty'),

  this.validateFields,
];
