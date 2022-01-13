const router = require("express").Router();
const controller = require("../controllers/channels");

router
    // search for channels
    .get("/:search", controller.getChannels)
    .post("/", controller.getChannels)

module.exports = router;