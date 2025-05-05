const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../../middleware');

// Autenticação
router.post('/register', userController.createUser);
router.post('/login', userController.login);

// CRUD com autenticação
router.get('/', verifyToken, userController.getAllUsers);
router.get('/:id', verifyToken, userController.getUserById);
router.put('/:id', verifyToken, userController.updateUser);
router.delete('/:id', verifyToken, userController.deleteUser);

module.exports = router;
