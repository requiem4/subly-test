import UserModel from "@models/UserModel";


const passport = require('passport')
const BearerStrategy = require('passport-http-bearer')
const LocalStrategy = require('passport-local')
// const User = require('../models/UserModel')
passport.use(new BearerStrategy(
    function (token: string, done: Function) {
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
}, (email: string, password: string, done: Function) => {
    return UserModel.findOne({where: {email: email}})
        .then((user: UserModel) => {
            if (!user || !user.validatePassword(password)) {
                return done(null, false, {errors: {'email or password': 'is invalid'}});
            }

            return done(null, user);
        }).catch(done);
}));
export default passport

