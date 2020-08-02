//Dependencies
const fs = require("fs");
const express = require("express");
const process = require("process");


//Express App and Port set up
const app = express();
const PORT = process.env.PORT || 3713;

//Data Parsing Set up
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));


// Require Routes Set up
require("./routes/htmlRoutes")(app);

//Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});