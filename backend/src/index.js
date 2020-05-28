require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const routes = require("./routes");
const app = express();

// Connect database
mongoose.connect(process.env.MONGO_DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan("dev")); //morgan mode
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
); // Static folder

// Application Routes
app.use(routes);

app.listen("3333", () => {
  console.log("Server running on http://localhost:3333");
});
