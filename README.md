# YOUTUBE_RSS
REST api to query and parse rss feeds of youtube channels

## 📝 Getting Started

```bash
# clone it
git clone git@github.com:JChris246/youtube_rss.git
cd youtube_rss

# Install dependencies
npm install

# Run the server
# server will run on port 8080, this can be changed in the index.js file
node index.js 
```

## 🐋 Docker 

Should you choose to run as a docker container, the docker compose in the root of the project can be used run start the service with the command `docker-compose up -d`. With the first run, the image will be built using the Dockerfile also found in the root of the project. If you need to rebuild the image after the first run of docker compose, the image can be built with the `docker build .` command from the root of the project.

## 🚀 Endpoints
The following endpoints are available

### Search for channels
```
url:    /api/channels/:search
method: GET
```

```
url:    /api/channels
method: POST
```

The POST request expects the following body:
```json
{
  "search": "searchtext"
}
```

A successful response will look like:
```json
[
  {
    "name": "channelname",
    "thumbnail":
      "https://yt3.ggpht.com/ytc/AKedOLTxqKm4RdnoWi_RtzgNNASy4nbciHGOj8QReqcOQ=s900-c-k-c0x00ffffff-no-rj",
    "channel": "https://www.youtube.com/channel/channel_id",
    "feed": "https://www.youtube.com/feeds/videos.xml?channel_id=channel_id",
  },
]
```

### Get latest videos from a channel
```
url:    /api/videos/:id
method: GET
```

*`id` here is the channel id*

A successful response will look like:

```json
[
  {
    "id": "videoid",
    "title": "video title",
    "url": "https://www.youtube.com/watch?v=videoid",
    "thumbnail": "https://i1.ytimg.com/vi/videoid/hqdefault.jpg",
    "description": "video description",
    "views": "434821",
    "published": "2022-01-13T02:05:59+00:00",
    "updated": "2022-01-13T13:12:51+00:00",
  },
]
```
