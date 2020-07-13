import { Request, Response, NextFunction } from "express";
import User from '@models/UserModel';
import UserModel from "@models/UserModel";
// const User = require('../models/UserModel');
const passport = require('passport');

class AuthController {

    static async register(req: Request, res: Response) {
        const params = req.body.user;
        if (!params) {
            return res.status(401).json({
                status: 401,
                error: 'Invalid params',
            })
        }

        if (!params.email) {
            return res.status(422).json({
                errors: {
                    email: 'is required',
                },
            });
        }

        if (!params.password) {
            return res.status(422).json({
                errors: {
                    password: 'is required',
                },
            });
        }

        const user = new UserModel(params);

        user.setPassword(user.password);

        return user.save()
            .then(() => res.json({user: user.toAuthJSON()}));
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        const email = req.param('email');
        const password = req.param('password');
        if (!email) {
            return res.status(422).json({
                errors: {
                    email: 'is required',
                },
            });
        }

        if (!password) {
            return res.status(422).json({
                errors: {
                    password: 'is required',
                },
            });
        }

        return passport.authenticate('local', {session: false}, (error: Error, passportUser: UserModel) => {
            if (error) {
                return next(error);
            }

            if (passportUser) {
                const user = passportUser;
                user.token = passportUser.generateJWT();

                return res.json({user: user.toAuthJSON()});
            }

            return res.status(401).json({
                errors: {
                    password: 'is required',
                },
            });
        })
    }

    static async logout(req: Request, res: Response, next: NextFunction) {
        passport.deserializeUser()
        return res.send({logout: true})
    }

    static async changePassword(req: Request, res: Response, next: NextFunction) {

    }

}

export default AuthController
