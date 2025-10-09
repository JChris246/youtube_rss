FROM node:24.9.0-alpine

RUN mkdir -p /home/youtube_rss
WORKDIR /home/youtube_rss

# install curl for the health check and git for version
RUN apk add curl git

COPY package.json .

RUN npm install --omit=dev

# copy the git folder to get the version
COPY .git ./

RUN echo VERSION=$(git log --pretty=%H -1) > .env
ENV NODE_ENV=production
ENV PORT=8080

COPY ./ ./

EXPOSE 8080
HEALTHCHECK CMD curl --fail http://localhost:8080/api/ping || exit 1

CMD ["npm", "start"]