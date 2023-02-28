const express = require("express");

// modular routes
const routerNote = require("./note");

const app = express();

app.use("./note", routerNote);

module.exports = app;
