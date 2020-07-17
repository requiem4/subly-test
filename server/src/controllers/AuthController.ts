import {NextFunction, Request, Response} from "express";
import UserModel from "@models/UserModel";
import passport from "@config/passport";

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
        if (await user.validateUser()) {
            return user.createUser().then((res1) => {
                return res.json({user: user.toAuthJSON()})
            })
        }
        return res.status(422).json({
            errors: {
                data: 'is invalid',
            },
        });
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        const email = req.body.email;
        const password = req.body.password;
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

        return passport.authenticate('local', {session: false}, async (error: Error, passportUser: UserModel) => {
            if (error) {
                return res.json(error);
            }

            if (passportUser) {
                return res.json({user: passportUser.toAuthJSON()});
            }

            return res.status(401).json({
                errors: {
                    password: 'is required',
                },
            });
        })(req, res, next);
    }

    static async logout(req: Request, res: Response, next: NextFunction) {
        req.logout();
        return res.send({logout: true})
    }

    static async changePassword(req: Request, res: Response, next: NextFunction) {

    }

}

export default AuthController
