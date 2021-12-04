const router = require("express").Router();
const controller = require("../controllers/videos");

router
    .route("/:id")
    // get rss entries for channel
    .get(controller.getVideos)

module.exports = router;