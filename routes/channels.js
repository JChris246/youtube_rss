const router = require("express").Router();
const controller = require("../controllers/channels");

router
    // search for channels
    .get("/:search", async (req, res) => {
        const { code, success, msg, payload } = await controller.getChannels(req.params.search);
        if (success) {
            res.status(code).send(payload);
        } else {
            res.status(code).send({ msg });
        }
    })
    .post("/", async (req, res) => {
        const { code, success, msg, payload } = await controller.getChannels(req.body.search);
        if (success) {
            res.status(code).send(payload);
        } else {
            res.status(code).send({ msg });
        }
    })

module.exports = router;