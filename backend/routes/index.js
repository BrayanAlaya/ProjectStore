const express = require("express");

const user = require("./user");
const category = require("./category");
const notification = require("./notification");
const product = require("./product")
const wishlist = require("./wishlist")
const purchase = require("./purchase");
const cart = require("./cart");

const app = express();

app.use("/user", user);
app.use("/category", category);
app.use("/notification", notification);
app.use("/product", product);
app.use("/wishlist", wishlist);
app.use("/cart", cart);
app.use("/purchase", purchase);

module.exports = app;
