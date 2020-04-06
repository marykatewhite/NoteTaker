const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const notes = require("./db/db.json");

// GET
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  return res.json(notes);
});

// POST
app.post("/api/notes", function(req, res) {
  let newNote = req.body;
  notes.push(newNote);
  notes.forEach((element, i) => {
    element.id = i + 1;
  });
  fs.writeFileSync("db.json", JSON.stringify(notes));
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// DELETE
app.delete("/api/notes/:id", function(req, res) {
  const deletedID = req.params.id;
  console.log(notes);
  const deletedNote = notes.findIndex(function(note){
    return note.id == deletedID
  });
  notes.splice(deletedNote, 1);
  let newDB = JSON.stringify(notes);
  fs.writeFileSync("db.json", newDB);
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// LISTENER
app.listen(PORT, function() {
  console.log("Server is listening on PORT: " + PORT);
});
