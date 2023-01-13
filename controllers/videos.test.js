const server = require("../index.js");
const supertest = require("supertest");
const superTestRequest = supertest(server);  

describe("Channel endpoints", () => {
    it("GET /api/videos/:id should return a list of length 15 with the latest videos", async () => {
        const res = await superTestRequest.get("/api/videos/UCeeFfhMcJa1kjtfZAGskOCA");
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining("json"));
        expect(res.body).toHaveLength(15);

        expect(res.body[0]).toHaveProperty("id");
        expect(res.body[0]).toHaveProperty("title");
        expect(res.body[0]).toHaveProperty("url");
        expect(res.body[0]).toHaveProperty("description");
        expect(res.body[0]).toHaveProperty("views");
        expect(res.body[0]).toHaveProperty("published");
        expect(res.body[0]).toHaveProperty("updated");

        // TODO: use regex to match the values are as expected
    
    });
});