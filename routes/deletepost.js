const authorization = require("../middleware/auth");
const router = require('express').Router();
const db = require("../db");

router.delete("/:id", authorization, async (req, res) => {
    try {
        const blogPost = await db.query("DELETE FROM blog_post WHERE id = $1", [req.params.id]);
        res.status(204).json({
            status: "success"
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;