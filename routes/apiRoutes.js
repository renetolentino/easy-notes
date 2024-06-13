const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const authController = require('../controllers/authController');

/**
 *
 * ROTAS PARA ACESSO AS NOTAS
 */
router.get('/', authController.protectedRoute, noteController.getAllNotes);
router.post('/', authController.protectedRoute, noteController.createNote);
router.patch('/:id', authController.protectedRoute, noteController.changeNote);
router.delete('/:id', authController.protectedRoute, noteController.deleteNote);

/**
 *
 * ROTAS PARA CADASTRO E LOGIN
 */

router.post('/user/sign-up', authController.signUp);
router.post('/user/login', authController.login);

module.exports = router;
