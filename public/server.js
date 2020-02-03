// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var savedNotes = require("../db/database");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static('./assets/'));

//Basic HTML routes

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

// Reads the db.json file and return all saved notes as JSON
app.get("/api/notes", function(req, res) {
  return res.json(savedNotes);
});


// Recieve a new note to save on the request body, add it to the db.json file, and then return the new note to the client.

app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  newNote.id = savedNotes.length;

  console.log(newNote);

  savedNotes.push(newNote);

  res.json(newNote);
});

app.delete("api/notes/:id", function(req, res) {
  var deleteNote = req.params.id;

  console.log(deleteNote);

  for (var i = 0; i <savedNotes.length; i++){
    if(deleteNote === savedNotes[i].id){
      delete savedNotes[i];
      return res.json(savedNotes);

      
    }
  }

  return res.json(false);
});

// Start server

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
