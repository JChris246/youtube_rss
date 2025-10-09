const express = require("express");
const app = express();

// environment variables configuration
require("dotenv").config();

const PORT = process.env.PORT ?? 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

global.VERSION = process.env.VERSION || "1.1.0";

// routes
const channelsRouter = require("./routes/channels");
const videosRouter = require("./routes/videos");
const mcpRouter = require("./routes/mcp");

app.use("/api/channels", channelsRouter);
app.use("/api/videos", videosRouter);
app.use("/api/ping", (_, res) => res.status(200).send({ msg: "Pong", version: global.VERSION }));
app.use("/mcp", mcpRouter);

if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => console.log("Listening on " + PORT));
}

module.exports = app;