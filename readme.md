<p align="center">
  <a href="https://expressjs.com/" target="blank"><img src="https://miro.medium.com/v2/resize:fit:1400/1*XP-mZOrIqX7OsFInN2ngRQ.png" width="200" alt="Nest Logo" /></a>
</p>

# Vivir chevere

## Descripción del proyecto

Este proyecto es un software diseñado para facilitar el control de usuarios, historias médicas, productos comprados, afiliaciones, sedes e inventarios. El objetivo principal de este proyecto es proporcionar una solución integral y eficiente para la gestión de datos críticos. El sistema está desarrollado utilizando la plataforma Node.js y como base de datos se uso postgreSQL.

## Características principales

1. Control de usuarios: El sistema permite registrar y gestionar usuarios, asignando diferentes roles y privilegios según sea necesario. Se implementa una autenticación segura para garantizar la confidencialidad de la información.

2. Historias médicas: Los profesionales de la salud pueden acceder y administrar las historias médicas de los pacientes de manera electrónica, lo que facilita el seguimiento y el análisis de la información clínica.

3. Gestión de productos comprados: El sistema registra los productos o servicios adquiridos por los usuarios, brindando un historial de transacciones y facilitando la generación de reportes.

4. Control de afiliaciones: Permite gestionar las afiliaciones de los usuarios, lo que incluye información sobre activaciones, recomendados, entre otros.

5. Control de sedes: El sistema permite administrar múltiples sedes o ubicaciones dentro de una organización médica, facilitando la gestión de recursos y la asignación de personal.

6. Gestión de inventarios: Permite llevar un control preciso de los inventarios de productos en cada sede.

## Tecnologías utilizadas

1. Express: Un framework minimalista de Node.js que facilita la creación de aplicaciones web y APIs.

2. Express-rate-limit: Middleware de Express que limita la cantidad de solicitudes que un cliente puede hacer en un período de tiempo especificado.

3. Express-validator: Middleware de Express que valida los datos de entrada antes de que se procesen.

4. Firebase: Una plataforma de desarrollo de aplicaciones móviles y web que proporciona herramientas para crear, mejorar y hacer crecer aplicaciones.

5. Helmet: Middleware de Express que ayuda a proteger la aplicación de varias vulnerabilidades web mediante la configuración adecuada de las cabeceras HTTP.

6. HPP: Middleware de Express que previene los ataques de envenenamiento de parámetros HTTP.

7. Morgan: Middleware de Express que registra solicitudes HTTP para el registro y análisis.

8. Multer: Middleware de Express que maneja la carga de archivos multipart/form-data.

9. PostgreSQL: Un sistema de gestión de bases de datos relacionales de código abierto.

10. Sequelize: Un ORM (Object-Relational Mapping) para bases de datos SQL que simplifica la interacción con la base de datos y proporciona una capa de abstracción sobre SQL.

11. XSS-clean: Middleware de Express que limpia las entradas de usuario para evitar ataques de XSS (cross-site scripting).

## Requeisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado Node.js, PostgreSQL, nodemon en tu máquina.

## Cómo ejecutar el proyecto

1. Clonar el proyecto
2. Ejecutar `npm install`
3. Clonar el archivo `.env.template` y renombrarlo a `.env`
4. Cambiar las variables de entorno
5. Levantar la base datos
6. Levantar el modo de desarrollo: `npm run start:dev`
