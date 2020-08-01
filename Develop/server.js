const express = require("express");
const process = require("process");

const app = express();

const PORT = process.env.PORT || 3713;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


routes = "/api/";

require(__dirname + routes + "index.js")(app);
require(__dirname + routes + "notes.js")(app);

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});