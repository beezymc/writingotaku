require("dotenv").config();
const express = require("express");
const next = require('next');
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcrypt");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const initializePassport = require("./passportConfig");
const redis = require("redis");
const redisStore = require('connect-redis')(session);
const redisClient = redis.createClient();

initializePassport(passport);

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !=='production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    server.use(cors());
    server.use(cookieParser());
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(session({
        secret: process.env.SESSION_SECRET,
        store: new redisStore({ host: 'localhost', port: 6379, client: redisClient }),
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure : false,
            maxAge: 30 * 60 * 1000 // 30 minutes
        }
    }))

    server.use(passport.initialize());
    server.use(passport.session());

    //user register
    server.use("/api/v1/users/register/", require("./routes/register.js"));

    //user login
    server.use("/api/v1/users/login/", require("./routes/login.js"));

    //view main dashboard
    server.use("/api/v1/viewboard", require("./routes/viewboard.js"));

    //view main user dashboard
    server.use("/api/v1/dashboard", require("./routes/dashboard.js"));

    //view main user dashboard
    server.use("/api/v1/viewboard", require("./routes/userviewboard.js"));

    //post new blog post
    server.use("/api/v1/dashboard", require("./routes/addpost.js"));

    //delete blog post
    server.use("/api/v1/dashboard", require("./routes/deletepost.js"));

    server.all('*', (req, res) => {
        return handle(req, res)
      })
    server.listen(port, () => {
        console.log(`server is up and listening on Port ${port}`);
    });
});