FROM node:24.4.0-alpine

RUN mkdir -p /home/youtube_rss
WORKDIR /home/youtube_rss

COPY package.json .

RUN npm install --omit=dev

COPY ./ ./

EXPOSE 8080
CMD ["npm", "start"]