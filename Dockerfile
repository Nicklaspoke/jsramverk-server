FROM  node:14 AS base

WORKDIR /server

COPY ./package.json ./

RUN npm i

COPY ./knexfile.js ./
COPY ./src/ ./src/
COPY ./migrations/ ./migrations/
COPY ./seeds/ ./seeds/
COPY ./.env ./

RUN npm run db:migrate
RUN npm run db:seed

ENTRYPOINT [ "npm", "start" ]