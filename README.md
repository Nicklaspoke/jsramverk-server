# jsramverk-server

This is a REST-API server that are build to work together with my [client](https://github.com/Nicklaspoke/jsramverk-client)

# Installation and running

## prerequisites

-   nodejs version >=12 (developed on 14 but should work with latest LTS)
-   optionally Mysql installed

There are two ways to run the server, either you install everything localy or you can use docker to run the server.

## Install localy

To install and run the server localy install all dependencies with the command `npm i`. After that make shure you create a file called `.env` in the root.
If no `.env` file is provided the server will default to run on port 8080, the database will be sqlite3 and your JWT secret will become 'devmode'

After installing and optinally setting up a `.env` file, you will need to run a database migration to create the nessesary tables. To do this run the command `npm run db:migrate`
after the migration has been ran. You will need to seed it for a default admin account (ONLY USE THIS IN DEVELOPMENT).

To start the server you can either use `npm start` or `npm run start-dev`, dev will use nodemon to to watch and auto reload the server for you.

You can utilize the default admin account to develop and the the API.

-   `emial: admin@admin.se`
-   `password: admin`

## Use docker

Easiest way to use the docker container is to utilize docker-compose. Either run `docker-compose up server` to launch the server as is or use `docker-compose up server-dev` to enable watch and autoreload

# .env file

The `.env` file contains envirioment variables for the server to config it correctly

-   `NODE_ENV` defines your node envirioment, can either be production or development
-   `DEVTOKEN` if you wish to not have to reauthenticate all the time during development, you can set a token here that CAN ONLY be used when `NODE_ENV` is set to development
-   `PORT` specifies which port the server will be running on
-   `JWTSECRET` specifies a secret key to be used for signing the JWT tokens (recomended lenght is a 256 bit key)
-   `DB_TYPE` specifies which type of database to use for the server, currently only sqlite and mysql is supported on the server
-   `DB_HOST` specifies which host your database is running on
-   `DB_PORT` specifies which port the database is communicating on
-   `DB_USER` specifies which user to use for the communcation with the database
-   `DB_PASS` specifies the password for above user
-   `DB_NAME` specifies the name of the database to use
-   `SQLITE_FILE` specifies the name of the sqlite file (path is relative to the configuration loader, `./src/db`)
