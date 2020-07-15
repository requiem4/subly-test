/**
 * Site Router
 * @var router Router
 */
const express = require('express');
const siteRouter = express.Router();


siteRouter.use('/test', function (request: Request, response: Response) {
    return response.json();
})

export default siteRouter