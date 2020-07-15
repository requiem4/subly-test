/**
 * Root Router
 */
import apiRouter from './api/ApiRouter'
import siteRouter from './site/SiteRouter'
import Authorization from "@routes/Authorization";
const version = 'v1'
const express = require('express');
const router = express.Router();
router.use('/', siteRouter)
router.use('/api/' + version, apiRouter)
export default router

