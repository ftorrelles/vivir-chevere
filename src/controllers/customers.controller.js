const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken'); // Importa el módulo jsonwebtoken

const CustomersServices = require('../services/customers.services');
const customerServices = new CustomersServices();
// const EmailCode = require('../database/models/emailcode.js');
const db = require('../database/models');
const { log } = require('console');
////////////////////////////
exports.findAll = catchAsync(async (req, res, next) => {
  const { firstName, lastName, identificationDocument } = req.query;
  const customers = await customerServices.findAll(
    firstName,
    lastName,
    identificationDocument
  );
  return res.status(200).json({
    status: 'success',
    results: customers.length,
    customers,
  });
});
////////////////////////////

exports.create = catchAsync(async (req, res, next) => {
  const {
    firstName,
    lastName,
    identificationDocument,
    email,
    phone,
    birthdate,
    typecustomerId,
    roleId,
    password,
    ref,
    username,
    status,
    frontBaseUrl,
  } = req.body;
  const encriptedPassword = await bcrypt.hash(password, 10);

  const customer = await customerServices.create({
    firstName,
    lastName,
    identificationDocument,
    email,
    phone,
    birthdate,
    typecustomerId,
    roleId,
    password: encriptedPassword,
    ref,
    username,
    status,
  });
  const code = require('crypto').randomBytes(32).toString('hex');
  const linkVerify = `${frontBaseUrl}/verify_email/${code}`;

  await sendEmail({
    to: email,
    subject: 'Codigo de verificacion web vivir chevere',
    html: `
      <h1>holaa ${firstName}!!</h1>
      <p>Te saludamos tus socios de Vivir Chevere</p>
      <p>Ya casi terminamos</p>
      <p>Ve al siguiente enlace para verificar tu correo electrónico y asi puedas ingresar a tu oficina virtual</p>
      <a href="${linkVerify}">hacer click aqui</a>
      <br/>
      <h3>tus credenciales de ingreso son las siguientes</h3>
      <p>Usuario: ${email}</p>
      <p>Contraseña: ${username}</p>
    `,
  });

  // Guardar el código en tu base de datos usando el modelo EmailCode
  await db.EmailCode.create({
    code,
    customerId: customer.id,
  });

  return res.status(201).json({
    status: 'Success',
    message: 'the customer has benn created',
    customer,
  });
});

//////////////////////////
exports.findOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const customer = await customerServices.findOne(id);
  return res.status(200).json({
    status: 'Success',
    customer,
  });
});
//////////////////////

exports.update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    identificationDocument,
    // email,
    phone,
    birthdate,
    // typecustomerId,
    roleId,
    // password,
    // ref,
    // username,
    // status,
    // isVerified,
  } = req.body;
  // const customer = await customerServices.findOne(id);
  const customerUpdated = await customerServices.update(id, {
    firstName,
    lastName,
    identificationDocument,
    // email,
    phone,
    birthdate,
    // typecustomerId,
    roleId,
    // password,
    // ref,
    // username,
    // status,
    // isVerified,
  });
  return res.status(200).json({
    status: 'Success',
    message: 'The customer has benn updated!',
    customerUpdated,
  });
});
//////////////////////

exports.sendPasswordRecoveryEmail = catchAsync(async (req, res) => {
  const { email, frontBaseUrl } = req.body;

  const customer = await customerServices.findByEmail(email);
  if (!customer) {
    return res.status(404).json({ message: 'Customer not found' });
  }

  const code = require('crypto').randomBytes(32).toString('hex');
  const link = `${frontBaseUrl}/reset_password/${code}?email=${encodeURIComponent(
    email
  )}`;
  await sendEmail({
    to: email,
    subject: 'Recuperación de contraseña - Vivir Chevere',
    html: `
      <h1>Hola ${customer.firstName}!!</h1>
      <p>Te saludamos desde Vivir Chevere</p>
      <p>Para completar el proceso de cambio de contraseña, sigue este enlace:</p>
      <a href="${link}">hacer click aqui</a>
      <br/>
    `,
  });

  // Guardar el código en tu base de datos usando el modelo PasswordResetCode
  await db.PasswordResetCode.create({
    code,
    email,
  });

  return res.status(200).json({
    status: 'Success',
    message: 'Correo de recuperación enviado.',
  });
});

exports.resetPassword = catchAsync(async (req, res) => {
  const { email, newPassword } = req.body;
  const code = req.params.code;

  // Verificar si el código de validación es correcto
  const validCode = await db.PasswordResetCode.findOne({
    where: { email, code },
  });

  if (!validCode) {
    return res.status(401).json({ message: 'Invalid validation code' });
  }

  // Actualizar la contraseña del cliente
  const encriptedPassword = await bcrypt.hash(newPassword, 10);
  await customerServices.updatePasswordByEmail(email, encriptedPassword);

  // Eliminar el código de validación usado
  await validCode.destroy();

  return res.status(200).json({
    status: 'Success',
    message: 'Contraseña actualizada exitosamente.',
  });
});

/////////////

exports.delete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const customerDeleted = await customerServices.delete(id);

  return res.status(200).json({
    status: 'Success',
    message: 'The customer has benn deleted!',
    customerDeleted,
  });
});

////////////////
// El controlador verifyEmail
exports.verifyEmail = catchAsync(async (req, res) => {
  const { code } = req.params;
  const emailCode = await db.EmailCode.findOne({ where: { code } });
  if (!emailCode) return res.status(401).json({ message: 'invalid code' });

  // Utiliza el servicio CustomersServices para actualizar el campo isVerified en la tabla Customer
  await customerServices.update(emailCode.customerId, { isVerified: true });
  await emailCode.destroy();

  // return res.json(emailCode);
  return res.status(200).json({
    status: 'Success',
    message: 'The customer has benn verified!',
  });
});

///////////////////////

// El controlador login
exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const customer = await customerServices.findByEmail(email);

  if (!customer)
    return res.status(401).json({ message: 'invalid credentials' });
  if (!customer.isVerified)
    return res.status(401).json({ message: 'unverified email' });

  const isValid = await bcrypt.compare(password, customer.password);
  if (!isValid) return res.status(401).json({ message: 'invalid credentials' });

  if (customer.Role.name_role === 'Sin rol') {
    return res.status(403).json({ message: 'not authorized' });
  }
  // Generar el token utilizando jsonwebtoken
  const token = jwt.sign(
    { customerId: customer.id },
    process.env.TOKEN_SECRET,
    {
      expiresIn: '1d', // Define el tiempo de expiración del token (1 día en este caso)
    }
  );

  return res.json({ customer, token });
});
//////////////////////////

// El controlador getLoggedUser
exports.getLoggedUser = catchAsync(async (req, res) => {
  // El middleware de autenticación verifyJWT agrega el usuario decodificado en req.user
  const loggedUser = req.user;
  // Verificar si el usuario autenticado existe
  if (!loggedUser) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  // Obtener el cliente y su información adicional, como el rol
  const customerWithRole = await customerServices.findOne(
    loggedUser.customerId
  );

  // Verificar si el cliente existe
  if (!customerWithRole) {
    return res.status(401).json({ message: 'Customer not found' });
  }
  // Devolver el cliente autenticado con su información, incluido el rol
  return res.json(customerWithRole);
});
