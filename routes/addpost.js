const authorization = require("../middleware/auth");
const router = require('express').Router();
const db = require("../db");

router.post("/", authorization, async (req, res) => {
    try {
        const blogPost = await db.query("INSERT INTO blog_post (title, blog_body, user_id, author) values($1, $2, $3, $4) returning *", [req.body.title, req.body.blog_body, req.user.id, req.user.username])
        res.status(201).json({
            status: "success",
            data: {
                blog: blogPost.rows[0]
            }
        })
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;