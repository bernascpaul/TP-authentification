FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN npm install -g pm2

WORKDIR /home/node/app

COPY package*.json ./

COPY index.js ./
COPY db.json ./
COPY accueil.html ./
COPY bad-access.html ./
COPY co-problem.html ./
COPY co-problem-no-access.html ./
COPY content-blocked.html ./
COPY content.html ./
COPY create-account.html ./
COPY create-account-ok.html ./
COPY create-account-problem.html ./
COPY login-ok.html ./
COPY logout.html ./



USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "index.js" ]
