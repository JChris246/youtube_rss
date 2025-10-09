const { getRequest } = require("../request");

const channelRegex = [RegExp('\/c\/([^"\']+)', "sig"), RegExp('channelId[\'"]:["\']([^"\']+)', "sig")];

module.exports.getChannels = async (search) => {
    if (!search) {
        return { success: false, code: 400, msg: "You need to provide a 'search'" }
    }
    
    if (search.trim().length < 1) {
        return { success: false, code: 400, msg: "Not searching for nothing" }
    }

    const ids = await getChannelsIds(search);
    if (ids.length < 1) {
        return { success: false, code: 404, msg: "Could not find any channels when searching for: " + search }
    }

    const channels = await Promise.all(ids.map(id => getInfo(id)));
    return { code: 200, payload: channels, success: true }
};

const getChannelsIds = async (search, depth=1) => {
    const searchUrl = "https://www.youtube.com/results?search_query=" + search.trim().replace(/ /g, "+");
    const page = await getRequest(searchUrl);

    let unique = [];
    const ids = Array.from(page.matchAll(channelRegex[1]), m => m[1]);
    ids.forEach(i => {
        if (unique.filter(j => j === i.trim()).length < 1)
            unique.push(i.trim());
    });

    if (depth > 0) {
        const searches = Array.from(page.matchAll(channelRegex[0]), m => m[1]);
        for(let i = 0; i < searches.length; i++) {
            (await getChannelsIds(searches[i].split("/")[0], 0)).forEach(i => {
                if (unique.filter(j => j === i.trim()).length < 1)
                    unique.push(i.trim());
            });
        }
    }
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