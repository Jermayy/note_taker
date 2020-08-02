// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
const fs = require("fs");
const path = require("path");


// ===============================================================================
// ROUTING
// ===============================================================================


function updateDB() {
    fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
        if (err) throw err;
        return true;
    })
}


module.exports = (app) => {
    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content
    // ---------------------------------------------------------------------------

    fs.readFile("db/db.json", "utf8", (err, data) => {

        if (err) throw err;

        let notes = JSON.parse(data);



        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/index.html"))
        });



        app.get("/api/notes", (req, res) => {
            res.JSON(notes);
        });

        app.post("/api/notes", (req, res) => {
            let newNote = req.body;
            notes.push(req.body);
            updateDB();
            return console.log(`Database updated: ${newNote.title}`)
        })


        app.get("/api/notes/:id", (req, res) => {
            res.JSON(notes[req.params.id]);
        });

        app.delete("/api/notes/:id", (req, res) => {
            notes.splice(req.params.id, 1);
            updateDB();
            console.log(`Deleting note with id ${req.params.id}`);
        })





















        // If no matching route is found default to home
        app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "../public/assets/index.html"));
        });

    });




};