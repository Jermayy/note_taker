// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
const fs = require("fs");
const path = require("path");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = (app) => {
    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content
    // ---------------------------------------------------------------------------


    fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {

        if (err) throw err;

        let notes = JSON.parse(data);

        app.get("/api/notes", (req, res) => {
            res.JSON(notes);
        });



















        // If no matching route is found default to home
        app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "../public/assets/index.html"));
        });

    });




};