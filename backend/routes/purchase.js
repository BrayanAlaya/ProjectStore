const express = require("express");
const controller = require("../controllers/purchaseController");
const auth = require("../middleware/authenticaded");

let app = express();

app.post("/",auth,controller.save);
app.get("/", auth ,controller.get);
app.get("/details/:id", auth ,controller.getDetails);
app.get("/sales", auth ,controller.getSales);
app.delete("/:id", auth, controller.delete);

module.exports = app;