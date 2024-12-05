const express = require("express");
const auth = require("../middleware/authenticaded");
const cartController = require("../controllers/cartController");

let app = express();

app.post("/", auth ,cartController.save);
app.get("/", auth ,cartController.get);
app.delete("/:id", auth ,cartController.delete);
app.delete("/", auth ,cartController.deleteMany);

module.exports = app;