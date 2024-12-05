const express = require("express")
const authMiddleware = require("../middleware/authenticaded");
const productController = require("../controllers/productController");
const multer = require("multer")

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

let app = express();

app.post("/", authMiddleware, upload.array('image',4), productController.save);
app.get("/", productController.getBySearch) //query = user=(int id), category=(int id), name=(string), page=(int) 
app.put("/:id", authMiddleware, upload.array('image',4),productController.update)
app.delete("/:id", authMiddleware, productController.delete)

module.exports = app;
