//Packages
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");

//Local Variables/Packages
const port = process.env.PORT || 5000;
const db = require("./models");

//Options
var corsOptions = {
  origin: "http:localhost:3000",
};

//Package Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Backend Working" });
});

app.post("/", (req, res) => {
  res.status(200).json({ msg: "Backend Post Working" });
});

//import error handler
app.listen(port, () => console.log(`Server started on port ${port}`));
