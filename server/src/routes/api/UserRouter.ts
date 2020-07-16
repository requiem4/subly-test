/**
 * User Router
 * @var router Router
 */
const express = require('express');
const router = express.Router();
import UserController from '@controllers/UserController'

router.get('/', UserController.index);
router.get('/report', UserController.getReport);

export default router