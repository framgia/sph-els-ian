//Packages
const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const cors = require("cors");

//Local Variables/Packages
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");

//Options
var corsOptions = {
  origin: "http://localhost:3000",
};

//Package Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Backend Working" });
});

app.use("/api/auth", require("./routes/auth/authRoutes"));
app.use("/api/admin", require("./routes/admin"));
app.all("*", (req, res) => {
  res.status(404);
  throw new Error("Request not found");
});

//import error handler
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
