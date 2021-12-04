const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
const channelsRouter = require("./routes/channels");
const videosRouter = require("./routes/videos");

app.use("/api/channels", channelsRouter);
app.use("/api/videos", videosRouter);

app.listen(PORT);

module.exports = app;