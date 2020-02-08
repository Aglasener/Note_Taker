// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
var util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

console.log(readFileAsync("../db/database.json"));
// var test = '{"id": 0,"title": "test", "text": "testbody"}';

// var result = JSON.parse(test);
// console.log(result.id);
// console.log(test);
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
  return res.json(JSON.parse("../db/database.json"));
});


// Recieve a new note to save on the request body, add it to the db.json file, and then return the new note to the client.

app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  let savedNotes = JSON.parse("../db/database.json");
  newNote.id = savedNotes.length;

  console.log(newNote);

  savedNotes.push(newNote);
  
  writeFileAsync("../db/database.json", JSON.stringify(savedNotes));

  res.json(newNote);
});

// app.delete("/api/notes/:id", function(req, res) {
//   var deleteNote = req.params.id;
//   let savedNotes = JSON.parse(readFileAsync("../db/database.json"));
//   console.log(deleteNote);

//   for (var i = 0; i <savedNotes.length; i++){
//     if(deleteNote === savedNotes[i].id){
//       savedNotes.splice(i, 1);

//       writeFileAsync("../db/database.json", JSON.stringify(savedNotes));
//       //fs write or replace the string only in database.js with new one in order to create a persistance database info
//       return res.json(savedNotes);

//     }
//   }

//   return res.json(false);
// });

// Start server

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
