require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());

mongoose.connect(process.env.MDB_URL, { useNewUrlParser: true });
const db = mongoose.connection;

//connection message
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to db"));

console.log("hello");

//express set up
app.use(express.json());

const itemsRouter = require("./routes/items");

app.use("/grocery_store", itemsRouter);
app.listen(5000, () => console.log("Server started"));
