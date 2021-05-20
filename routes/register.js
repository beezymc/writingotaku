const bcrypt = require("bcrypt");
const router = require('express').Router();
const db = require("../db");
const passport = require("passport");

router.post("/", async (req, res, next) => {
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.password2) {
        res.status(401).json({
            status: "failed",
            message: "Please enter all fields"});
    } else if (req.body.password.length < 8)  {
        res.status(401).json({                  
            status: "failed",
            message: "Password must be at least 8 characters long"});
    } else if (req.body.password !== req.body.password2 ) {
        res.status(401).json({
            status: "failed",
            message: "Please ensure passwords match"});       
    } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        try {
            const emailCheck = await db.query("SELECT * from users where email = $1", [req.body.email]);
            if (emailCheck.rows.length > 0) {
                res.status(401).json({
                    status: "failed",
                    message: "Email already registered"});  
            } else {
                const insertUser = await db.query("INSERT INTO users (username, email, password) values($1, $2, $3)",
                [req.body.username, req.body.email, hashedPassword]);
                passport.authenticate("local", function(err, user, info) {
                    if (err) { 
                        return console.log(err); 
                    }
                    if (!user) { 
                        res.status(401).json({
                            status: "failed",
                            message: info.message
                        });
                        return;
                    } else {
                        req.logIn(user, function(err) {
                            if (err) { return next(err); }
                            else {
                                res.status(200).json({
                                    status: "success"
                                });
                                return;
                            }
                        });
                    }
                })(req, res, next);
            }
        } catch(err) {
            console.log(err);
        }
        
        
    }  
});

module.exports = router;