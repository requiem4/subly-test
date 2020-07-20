/**
 * File Router
 * @var router Router
 */

const express = require('express');
const router = express.Router();
import upload from "@config/multer";
import fileUpload from "express-fileupload";
import FileController from '@controllers/FileController'
router.use(fileUpload());
router.get('/', FileController.index);
router.post('/upload', FileController.afterUploading);
router.get('/report', FileController.getReport);
router.delete('/', FileController.deleteFiles);
router.get('/report/:userId', FileController.getReport);

export default router