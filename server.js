require('dotenv').config();

// Configuration check.
const ACCEPTED_ENVS = ['development', 'test', 'production'];
if (!ACCEPTED_ENVS.includes(process.env.NODE_ENV)) {
    throw new Error(`Invalid NODE_ENV in .env file. Should be one of ${ACCEPTED_ENVS.join(', ')}`);
} else if (typeof process.env.SECRET !== 'string' || process.env.SECRET.length < 5) {
    throw new Error('No or bad Secret supplied in env. Secret required.');
} else if (process.env.NODE_ENV === 'production' && (process.env.JAWSDB_URL === undefined || process.env.JAWSDB_URL === '')) {
    throw new Error('Production database not properly configured. Supply a URL');
} else if (process.env.LOCALDB_URL === undefined || process.env.LOCALDB_URL === '') {
    throw new Error('No connection URL supplied for local DB');
}

// Requiring necessary npm packages
const express = require('express');
const path = require('path');
// Requiring our routes
const routes = require('./controllers');
// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 3001;
const db = require('./models');
// Bringing in Morgan, a nice logger for our server
const morgan = require('morgan');
// Creating express app and configuring middleware needed for authentication
const app = express();

// Set up our middleware!
// Dev Logging. Only works in test or development
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('client/build'));
// Add all our backend routes
app.use(routes);

// Send all other requests to react app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});


let config = { force: false };
if (process.env.NODE_ENV === 'test') {
    config.force = true;
}
// if we need it! {force:true}
// Syncing our database and logging a message to the user upon success
db.sequelize.sync(config).then(function () {
    if (process.env.NODE_ENV === 'test') {
        db.User.create({ email: 'test@test.com', password: 'password' }).then(
            () => {
                console.log('Test User Created');
            }
        );
    }
    app.listen(PORT, function () {
        console.log(`Server now on port ${PORT}!`);
    });
});
