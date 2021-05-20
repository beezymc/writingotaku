const authorization = require("../middleware/auth");
const router = require('express').Router();
const db = require("../db");

router.get("/", authorization, async (req, res) => {
    try {
        const blogPost = await db.query("select * from blog_post where user_id = $1", [req.user.id]);
        res.status(200).json({
            status: "success",
            results: blogPost.rows.length,
            data: {
                blogs: blogPost.rows
            }
        })
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;