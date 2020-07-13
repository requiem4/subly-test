const jwt = require('express-jwt');
import {Request} from 'express';

class Authorization {
    private static getTokenFromHeaders = (req: Request) => {
        const authorization = req.header('authorization')
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            return authorization;
        }
        return null;
    };

    public static checkAuth = {
        required: jwt({
            secret: 'secret',
            userProperty: 'payload',
            getToken: Authorization.getTokenFromHeaders,
        }),
        optional: jwt({
            secret: 'secret',
            userProperty: 'payload',
            getToken: Authorization.getTokenFromHeaders,
            credentialsRequired: false,
        }),
    }
}

export default Authorization
