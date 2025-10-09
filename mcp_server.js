const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const { z } = require("zod");

const { getChannels } = require("./controllers/channels");
const { getVideos } = require("./controllers/videos");

const server = new McpServer({
    name: "youtube_rss",
    version: global.VERSION
});

server.registerTool(
    "echo",
    {
        title: "Echo Tool",
        description: "Echoes back the provided message",
        inputSchema: { message: z.string() }
    },
    async ({ message }) => ({
        content: [{ type: "text", text: `Tool echo version ${global.VERSION}: ${message}` }]
    })
);

server.registerTool(
    "channel",
    {
        title: "Search for a channel",
        description: "Uses the provided to string to search for a matching youtube channel",
        inputSchema: { search: z.string() }
    },
    async ({ search }) => {
        const { success, msg, payload } = await getChannels(search);
        if (success) {
            return { content: [{ type: "text", text: JSON.stringify(payload) }] }
        } else {
            return { content: [{ type: "text", text: msg }] }
        }
    }
);

server.registerTool(
    "videos",
    {
        title: "Get latest videos",
        description: "Uses the provided channel id to retrieve the latest videos from the matching youtube channel",
        inputSchema: { channelId: z.string() }
    },
    async ({ channelId }) => {
        const { success, msg, payload } = await getVideos(channelId);
        if (success) {
            return { content: [{ type: "text", text: JSON.stringify(payload) }] }
        } else {
            return { content: [{ type: "text", text: msg }] }
        }
    }
);

module.exports.server = server;