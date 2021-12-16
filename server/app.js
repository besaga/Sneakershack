require("dotenv/config");
require("./db");
const path = require('path')

const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "public")))
require("./routes")(app)
app.use((req, res) => res.sendFile(__dirname + "/public/index.html"));

require("./config")(app);
require("./config/session.config")(app)
require("./routes")(app)
require("./error-handling")(app);
console.log()
module.exports = app;
