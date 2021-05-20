const router = require('express').Router();
const passport = require("passport");

router.post("/", (req, res, next) => {
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
});

module.exports = router;