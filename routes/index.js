const express = require("express");

// import modular routers
const routerNotes = require("./note");

const app = express();

app.use("/notes", routerNotes);

module.exports = app;
