import passport from "passport";
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

    public static checkJwt(){
        return {
            required: jwt({
                secret: 'secret',
                getToken: Authorization.getTokenFromHeaders,
            }),
            optional: jwt({
                secret: 'secret',
                getToken: Authorization.getTokenFromHeaders,
                credentialsRequired: false,
            }),
        }
    }
    public static checkAuth(){
        return passport.authenticate('jwt', { session: false });
    }
}

export default Authorization
