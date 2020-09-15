exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('report')
        .del()
        .then(function () {
            // Inserts seed entries
            return knex('report').insert([
                {
                    week: 1,
                    title: 'Kmom01',
                    content: `
# jsramverk-me-page

## How to run the application

### prerequisites
* nodejs version >= 12 (developed on version 14, but should work with the latest lts)

The easiest way to get the application up and running is to first use \`npm i\` to install all dependencies, after that use \`npm start\` to begin runnint the development server.
Once the server has started, it can be accessed on localhost:3000
                    `,
                },
                {
                    week: 2,
                    title: 'Kmom02',
                    content: `
# jsramverk-server

This is a REST-API server that are build to work together with my [client](https://github.com/Nicklaspoke/jsramverk-client)

# Installation and running

## prerequisites

-   nodejs version >=12 (developed on 14 but should work with latest LTS)
-   optionally Mysql installed

There are two ways to run the server, either you install everything localy or you can use docker to run the server.

## Install localy

To install and run the server localy install all dependencies with the command \`npm i\`. After that make shure you create a file called \`.env\` in the root.
If no \`.env\` file is provided the server will default to run on port 8080, the database will be sqlite3 and your JWT secret will become 'devmode'

After installing and optinally setting up a \`.env\` file, you will need to run a database migration to create the nessesary tables. To do this run the command \`npm run db:migrate\`
after the migration has been ran. You will need to seed it for a default admin account (ONLY USE THIS IN DEVELOPMENT).

To start the server you can either use \`npm start\` or \`npm run start-dev\`, dev will use nodemon to to watch and auto reload the server for you.

You can utilize the default admin account to develop and the the API.

-   \`emial: admin@admin.se\`
-   \`password: admin\`

## Use docker

Easiest way to use the docker container is to utilize docker-compose. Either run \`docker-compose up server\` to launch the server as is or use \`docker-compose up server-dev\` to enable watch and autoreload

# .env file

The \`.env\` file contains envirioment variables for the server to config it correctly

-   \`NODE_ENV\` defines your node envirioment, can either be production or development
-   \`DEVTOKEN\` if you wish to not have to reauthenticate all the time during development, you can set a token here that CAN ONLY be used when \`NODE_ENV\` is set to development
-   \`PORT\` specifies which port the server will be running on
-   \`JWTSECRET\` specifies a secret key to be used for signing the JWT tokens (recomended lenght is a 256 bit key)
-   \`DB_TYPE\` specifies which type of database to use for the server, currently only sqlite and mysql is supported on the server
-   \`DB_HOST\` specifies which host your database is running on
-   \`DB_PORT\` specifies which port the database is communicating on
-   \`DB_USER\` specifies which user to use for the communcation with the database
-   \`DB_PASS\` specifies the password for above user
-   \`DB_NAME\` specifies the name of the database to use
-   \`SQLITE_FILE\` specifies the name of the sqlite file (path is relative to the configuration loader, \`./src/db\`)

                    `,
                },
                {
                    week: 0,
                    title: 'presentation',
                    content: `
                    <h1>Well hello there fellow traveller of the internet</h1>
                    <p>
                        You might wonder where you have ended up. Maybe you got this link from a
                        friend or colleague? Or you just happend to stumble accros by chance.
                    </p>
                    <p>
                        Well when you are here, let me tell you some things about myself. Currently
                        I reside in a singel person vault, also known as an apartment located in a
                        location known as <b style={{ color: 'red' }}>REDACTED</b>. While living
                        here, I do quite a few things. Among those are programming(obviosly),
                        playing MMO games like Runescape and World of Warcraft (WoW) and another
                        plethora of games like platformers, action, simulation and puzzle games. But
                        I alse watch a lot of movies and TV-Shows among those the genere I watch the
                        most are Action and Scifi. That's about it about me, feel free to explre the
                        site and enjoy the for now limitied content.
                    </p>
                    `,
                },
            ]);
        });
};
