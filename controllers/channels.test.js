const server = require("../index.js");
const supertest = require("supertest");
const superTestRequest = supertest(server);

const Techlinked = {
    "channel": "https://www.youtube.com/channel/UCeeFfhMcJa1kjtfZAGskOCA", 
    "feed": "https://www.youtube.com/feeds/videos.xml?channel_id=UCeeFfhMcJa1kjtfZAGskOCA", 
    "name": "TechLinked", 
    "thumbnail": "https://yt3.ggpht.com/ytc/AMLnZu8kjW49vpvXfhMexd2K3Eybeg8Ir1hS93PcyuGPsg=s900-c-k-c0x00ffffff-no-rj" 
};

describe("Channel endpoints", () => {
    it("GET /api/channels/:search should return a list of channels found", async () => {
        const res = await superTestRequest.get("/api/channels/Techlinked");
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining("json"));
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty("channel");
        expect(res.body[0]).toHaveProperty("feed");
        expect(res.body[0]).toHaveProperty("name");
        expect(res.body[0]).toHaveProperty("thumbnail");

        const techlinked = res.body.find(({ name }) => name === Techlinked.name);
        expect(techlinked.channel).toEqual(Techlinked.channel);
        expect(techlinked.name).toEqual(Techlinked.name);
        expect(techlinked.feed).toEqual(Techlinked.feed);
        expect(techlinked.thumbnail).toEqual(Techlinked.thumbnail);    
    });

    it("POST /api/channels should return a list of channels found", async () => {
        const res = await superTestRequest
            .post("/api/channels")
            .send({ search: "Techlinked" });

        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining("json"));
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty("channel");
        expect(res.body[0]).toHaveProperty("feed");
        expect(res.body[0]).toHaveProperty("name");
        expect(res.body[0]).toHaveProperty("thumbnail");

        const techlinked = res.body.find(({ name }) => name === Techlinked.name);
        expect(techlinked.channel).toEqual(Techlinked.channel);
        expect(techlinked.name).toEqual(Techlinked.name);
        expect(techlinked.feed).toEqual(Techlinked.feed);
        expect(techlinked.thumbnail).toEqual(Techlinked.thumbnail);
    
    });
});