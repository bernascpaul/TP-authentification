FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN npm install -g pm2

WORKDIR /home/node/app

COPY package*.json ./

COPY index.js ./
COPY db.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "index.js" ]
