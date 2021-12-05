const { getRequest } = require("../request");

const entryRegex = RegExp("<entry>(.+?)<\/entry>", "sig");
// const mediaRegex = RegExp("media:thumbnail url=[\"'](.+jpg)[\"']", "i");

module.exports.getVideos = async (req, res) => {
    const channelUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=" + req.params.id;
    const xml = await getRequest(channelUrl);

    const entries = Array.from(xml.matchAll(entryRegex), m => m[1]);
    const videos = entries.map(entry => {
        const id = parseTagContent("yt:videoId", entry);
        const title = parseTagContent("title", entry) || parseTagContent("media:title", entry);
        const url = parseTagAttributes("link", entry)?.href || ("https://www.youtube.com/watch?v=" + id);
        const published = parseTagContent("published", entry);
        const updated = parseTagContent("updated", entry);
        const thumbnail = parseTagAttributes("media:thumbnail", entry)?.url;
        const description = parseTagContent("media:description", entry);
        const views = parseTagAttributes("media:statistics", entry)?.views;

        return { id, title, url, thumbnail, description, views, published, updated };
    });
    console.log(videos.length);

    res.status(200).send(videos);
};

const parseTagContent = (tag, str) => {
    if (!str)
        return "";
    const regex = RegExp("<" + tag + ">([^<]+)</" + tag + ">", "si");
    let match = str.match(regex);
    return match ? match[1] : "";
}

const parseTagAttributes = (tag, str) => {
    if (!str)
        return "";
    
    let tagDetails = str.match(RegExp("<" + tag + " ([^>]+?)\/?>", "si"));
    if (!tagDetails)
        return {};
    
    let keyPairs = tagDetails[1].matchAll(RegExp("([^ =]+)=[\"']([^\"']+)[\"']", "sig"));
    if (!keyPairs)
        return {};

    let attributes = {};
    let keyPairsArrays = Array.from(keyPairs, m => [m[1], m[2]]);
    keyPairsArrays.forEach(pair => attributes[pair[0]] = pair[1]);

    return attributes;
};