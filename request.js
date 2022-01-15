const https = require("https");

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

module.exports = { getRequest };
