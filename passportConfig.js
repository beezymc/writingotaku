const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./db");
const bcrypt = require("bcrypt");

const initialize = (passport) => {
    const authenticateUser = async (email, password, done) => {
        try {
            const results = await db.query("SELECT * FROM users WHERE email = $1", [email]);
            if (results.rows.length > 0) {
                const user = results.rows[0];
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) {
                        console.log(err);
                    } else if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {message: "Password is incorrect" });
                    }
                });
            } else {
                return done(null, false, { message: "Email address invalid" });
            }
        } catch(err) {
            console.log(err);
        }
    };
    // Stores user details inside session. serializeUser determines which data of the user
    // object should be stored in the session. The result of the serializeUser method is attached
    // to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
    //   the user id as the key) req.session.passport.user = {id: 'xyz'}
    passport.serializeUser((user, done) => done(null, user.id));

    // In deserializeUser that key is matched with the in memory array / database or any data resource.
    // The fetched object is attached to the request object as req.user
    passport.deserializeUser(async (id, done) => {
        try {
            const results = await db.query("SELECT * FROM users WHERE id = $1", [id]);
            return done(null, results.rows[0]);
        } catch (err) {
            return done(err);
        }
    });

    passport.use(
        new LocalStrategy(
            {usernameField: "email", passwordField: "password"},
            authenticateUser
        )
    );
};

module.exports = initialize;