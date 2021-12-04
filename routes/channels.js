const router = require("express").Router();
const controller = require("../controllers/channels");

router
    .route("/")
    // search for channels
    .get(controller.getChannels)

module.exports = router;