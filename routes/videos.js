const router = require("express").Router();
const controller = require("../controllers/videos");

router
    .route("/:id")
    // get rss entries for channel
    .get(async (req, res) => {
        const { code, success, msg, payload } = await controller.getVideos(req.params.id);
        if (success) {
            res.status(code).send(payload);
        } else {
            res.status(code).send({ msg });
        }
    })

module.exports = router;