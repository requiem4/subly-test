import UserModel from "@models/UserModel";
import passport from "passport";
import passportLocal from 'passport-local'
import passportBearer from 'passport-http-bearer'
import * as passportJwt from 'passport-jwt'

const LocalStrategy = passportLocal.Strategy;
const BearerStrategy = passportBearer.Strategy;
const JWTStrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;

passport.serializeUser<any, any>((user, done) => {
    done(undefined, user.id);
});

passport.deserializeUser((id: number, done) => {
    UserModel.findByPk(id).then((err: Error, user: UserModel) => {
        done(err, user);
    });
});
passport.use(new BearerStrategy(
    async function (token: string, done: Function) {
        return UserModel.findOne({where: {token: token}})
            .then(function (error: Error, user: UserModel) {
                if (error) {
                    return done(error);
                }
                if (!user) {
                    return done(null, false);
                }
                return done(null, user, {scope: 'all'});
            })
    }
))
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email: string, password: string, done: Function) => {
    return UserModel.findOne({where: {email: email}})
        .then((user: UserModel) => {
            if (!user || !user.validatePassword(password)) {
                return done({errors: {'email or password': 'is invalid'}}, false);
            }

            return done(null, user);
        }).catch(done);
}));

//This verifies that the token sent by the user is valid
passport.use(new JWTStrategy({
    //secret we used to sign our JWT
    secretOrKey : 'secret',
    //we expect the user to send the token as a query parameter with the name 'secret_token'
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    try {
        debugger
        //Pass the user details to the next middleware
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}));
export default passport

