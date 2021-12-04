const { getRequest } = require("../request");
const cheerio = require("cheerio");

const channelRegex = RegExp('\/channel\/([^"]+)', "sig");

module.exports.getChannels = async (req, res) => {
    let search = req.body.search;
    if (!search)
        return res.status(400).send("You need to provide a 'search'");
    
    if (search.trim().length < 1)
        return res.status(400).send("Not search for nothing");

    const ids = await getChannelsIds(search);
    if (ids.length < 1)
        return res.status(404).send("Could not find any channels when searching for: " + search);

    const channels = await Promise.all(ids.map(id => getInfo(id)));
    return res.status(200).send(channels);
};

const getChannelsIds = async (search) => {
    const searchUrl = "https://www.youtube.com/results?search_query=" + search.trim().replace(/ /g, "+");
    const page = await getRequest(searchUrl);

    let unique = [];
    const ids = Array.from(page.matchAll(channelRegex), m => m[1]);
    ids.forEach(i => {
        if (unique.filter(j => j === i).length < 1)
            unique.push(i);
    });
    return unique;
};

const getInfo = async (id) => {
    const url = "https://www.youtube.com/channel/" + id;
    const page = await getRequest(url);
    
    const channelMetadataRenderer = JSON.parse(page.match(RegExp('"channelMetadataRenderer":({.+?},.+?)},', "si"))[1]);
    const name = channelMetadataRenderer.title;
    const feed = channelMetadataRenderer.rssUrl;
    const channel = channelMetadataRenderer.channelUrl; 
    const thumbnail = channelMetadataRenderer.avatar.thumbnails[0].url;
    
    return {
        name,
        thumbnail,
        channel,
        feed
    };
};