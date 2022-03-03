const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - aplication/X-www-form-urlencoded
app.use(express.urlencoded({extended: true }));

//simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to contact book application." });
});

module.exports = app;