const router = require("express").Router();
const controller = require("../controllers/channels");

router
    .route("/")
    // search for channels
    .post(controller.getChannels)

module.exports = router;