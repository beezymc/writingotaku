const router = require('express').Router();
const db = require("../db");

router.get("/:username", async (req, res) => {
    try {
        const blogPost = await db.query("select * from blog_post where author = $1", [req.params.username]);
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