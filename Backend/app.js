const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");

const db = require("./config");
const mongoSanitize = require("express-mongo-sanitize");

//Connextion MONGOOSE
const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@p6openclassroom.kzhrt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(bodyParser.json());
app.use(mongoSanitize());

//CORS
app.use(cors());

//ROUTING
app.use("/api/auth", require("./routes/auth"));
app.use("/api/sauces", require("./routes/sauces"));

app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
