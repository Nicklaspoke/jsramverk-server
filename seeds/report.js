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
