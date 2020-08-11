# Subly-test
<p>
   Front-end use React, Redux, Material UI.
   On a server side Node js, Typescript, Sequelize.
   Database: Postgres.
</p>
<p>
</p>

[![NPM version][shield-npm]](#)
[![Node.js version support][shield-node]](#)
[![Build status][shield-build]](#)
<!-- [![Code coverage][shield-coverage]](#) -->
[![Dependencies][shield-dependencies]](#)
[![GPL licensed][shield-license]](#)

[shield-coverage]: https://img.shields.io/badge/coverage-100%25-brightgreen.svg
[shield-dependencies]: https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg
[shield-license]: https://img.shields.io/badge/license-GPL-blue.svg
[shield-node]: https://img.shields.io/badge/node.js%20support-10+-brightgreen.svg
[shield-npm]: https://img.shields.io/badge/npm-v6.4.0-blue.svg
[shield-build]: https://img.shields.io/badge/build-passing-brightgreen.svg

Requirements
------------

Subly test requires the following to run:

  * [Node.js][node] 10+
  * [npm][npm] (normally comes with Node.js)
  * Postgres


[node]: https://nodejs.org/
[npm]: https://www.npmjs.com/

<h2>Installation via docker</h2>
    <ul>
        <li>
            docker-compose build
        </li>
        <li>
            docker-compose up
        </li>
        <li> OR </li>
        <li>
            docker-compose up --build
        </li>
        <li>
            http://localhost:3000/
        </li>
    </ul>
    
<h2>Installation</h2>
<h3>Setup client</h3>

<ul>
    <li>
    cd client
    </li>
    <li>
    npm install
    </li>
    <li>
    npm start
    </li>
</ul>

<h3>Setup server</h3>
<p>Written on typescript</p>
<ul>
    <li>
    cd server
    </li>
    <li>
    npm install
    </li>
    <li>
    cd database 
    </li>
    <li>
        Setup host and database access in /config/config.json
        </li>
    <li>
    sequlizer or ../node_modules/.bin/sequelize db:migrate
    </li>
    <li>
    npm start
    </li>
</ul>
