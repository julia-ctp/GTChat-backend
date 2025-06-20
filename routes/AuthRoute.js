const express = require('express');
const AuthController = require('../controllers/AuthController');

const AuthRouter = express.Router();
const auth = new AuthController();

AuthRouter.post('/register', auth.register);
AuthRouter.post('/login', auth.login);

module.exports = AuthRouter;