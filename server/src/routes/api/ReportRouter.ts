/**
 * Report Router
 * @var router Router
 */
const express = require('express');
const router = express.Router();
import ReportController from '@controllers/ReportController'

router.get('/', ReportController.index);

export default router