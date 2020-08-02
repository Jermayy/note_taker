//Dependencies
const fs = require("fs");
const express = require("express");
const path = require("path");
const process = require("process");


//Express App and Port set up
const app = express();
const PORT = process.env.PORT || 3713;

//Data Parsing Set up
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));


// // Require Routes Set up
// require("./routes/htmlRoutes")(app);


// --------------------------------
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});



app.get("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs / fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);

});

app.post("/api/notes", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db/json", "utf8"));
    let newNote = req.body;
    let newID = (savedNotes.length).toString();
    newNote.id = newID;
    savedNotes.push(newNote);


});

app.delete("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db/json", "utf8"));
    let noteID = req.params.id;
    let resetID = 0;
    console.log(`Deleting note - ID: ${noteID}`);
    savedNotes = savedNotes.filter(currNote => {
        return currNote.id != noteID;
    })

    for (currNote of savedNotes) {
        currNote.id = resetID.toString();
        resetID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
    res.json(savedNotes);


});



// --------------------------------




//Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});