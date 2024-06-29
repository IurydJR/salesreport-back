const express = require('express');
const routes = express.Router();

const controllers = require('./app/controllers');

// Rota Sale
routes.post('/auth/sale', controllers.SaleController.create);
routes.get('/sale', controllers.SaleController.read);
routes.put('/auth/sale/:id', controllers.SaleController.update);
routes.delete('/auth/sale/:id', controllers.SaleController.delete);

routes.post('/auth/user', controllers.UserController.create);
routes.get('/user', controllers.UserController.read);
routes.put('/auth/user/:id', controllers.UserController.update);
routes.delete('/auth/user/:id', controllers.UserController.delete);

module.exports = routes; 