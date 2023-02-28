const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;

const note = express.Router();

//USE async and await for fs instead of promises

// GET route for retrieving all the notes
note.get("/", async (req, res) => {
  try {
    console.info(`${req.method} request received for notes`);
    const data = await fs.readFile("./db/db.json");
    res.json(JSON.parse(data));
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

// POST route for a new note
note.post("/", async (req, res) => {
  try {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;

    if (!title || !text) {
      res.status(400).send("Bad request: missing title or text");
      return;
    }

    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    const data = await fs.readFile("./db/db.json");
    const note = JSON.parse(data);
    note.push(newNote);
    await fs.writeFile("./db/db.json", JSON.stringify(note));
    res.json("Note added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

module.exports = note;
