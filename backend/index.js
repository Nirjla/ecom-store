const express = require("express");
const cors = require("cors");
const passport = require("passport");
const mongoose = require('mongoose');
const routes = require("./routes");
const { DB, SERVER } = require("./constants");

require('./utils/passportConfig');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(cors({
    origin: 'http://localhost:5173',
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api', routes);

app.get('/', (req, res) => {
    return res.json({
        message: "Hello from /"
    });
});

mongoose.connect(DB.DB_URL).then(() => {
    console.log(`[MongoDB]: connected`);

    app.listen(SERVER.SERVER_PORT, () => {
        console.log(`[SERVER]: listening on port ${SERVER.SERVER_PORT}`);
    });
}).catch(err => {
    console.log(err);
});
