# subly-test

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
    sequlizer or node_modules/.bin/sequelize db:migrate up
    </li>
    <li>
    npm start
    </li>
</ul>