const express = require("express");
const authMiddleware = require("../middleware/authenticaded");
const controller = require("../controllers/wishlistController");

let app = express()

app.post("/",authMiddleware, controller.save);
app.get("/", authMiddleware, controller.read);
app.delete("/:id", authMiddleware, controller.delete);

module.exports = app;