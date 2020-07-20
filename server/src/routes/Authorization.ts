import passport from "passport";
const jwt = require('express-jwt');
import {Request} from 'express';

class Authorization {

    public static checkJwt(){
        return {
            required: jwt({
                secret: 'secret',
                algorithms: ['HS256'],
            }),
            optional: jwt({
                secret: 'secret',
                algorithms: ['HS256'],
                credentialsRequired: false,
            }),
        }
    }
    public static checkAuth(){
        return passport.authenticate('jwt', { session: false });
    }
}

export default Authorization
