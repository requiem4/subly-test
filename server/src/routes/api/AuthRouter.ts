/**
 * Auth Router
 * @var router Router
 */
const express = require('express');
const router = express.Router();
import AuthController from '@controllers/AuthController'

router.get('/login', AuthController.login);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.post('/register', AuthController.register);

export default router