const https = require("https");
const puppeteer = require("puppeteer");

const getBrowserRequest = async (url) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const content = await page.content();
        await browser.close();
        return content;
    } catch (e) {
        console.log(e);
        return e;
    }
}

const getRequest = url => {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let chunks = [];
    
            response.on('data', fragments => chunks.push(fragments));
            response.on('end', () => resolve(Buffer.concat(chunks).toString()));
            response.on('error', (error) => reject(error));
        });
    });
};

module.exports = {
	getBrowserRequest,
	getRequest
};
