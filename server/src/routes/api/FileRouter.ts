/**
 * File Router
 * @var router Router
 */
const express = require('express');
const router = express.Router();
import FileController from '@controllers/FileController'

router.get('/', FileController.index);

export default router