const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const notes = require("./db/db.json");

app.get("/", function(req,res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// GET
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/api/notes" , function(req, res) {
  return res.json(notes);
});

// POST 
app.post("/api/notes", function(req,res) {
  const newNote = {};
  // title
  // text
  // id

});

// DELETE
app.delete("/api/notes/:id", function(req, res) {
  
});


app.listen(PORT, function() {
  console.log("Server is listening on PORT: " + PORT);
});
