const express = require("express");
const process = require("process");

const app = express();

const PORT = process.env.PORT || 3713;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


publicRoute = "/public/assets/";

require(__dirname + publicRoute + "index.html")(app);
require(__dirname + publicRoute + "notes.html")(app);

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});