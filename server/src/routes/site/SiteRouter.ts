/**
 * Site Router
 * @var router Router
 */
const express = require('express');
const siteRouter = express.Router();
import AuthRouter from './AuthRouter'

siteRouter.use('/auth', AuthRouter)

export default siteRouter