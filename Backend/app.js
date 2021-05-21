const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
const path = require('path')

//Connextion MONGOOSE
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://gzir:nmvua0eE@p6openclassroom.kzhrt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//CORS
app.use(cors());

//ROUTING
app.use("/api/auth", require("./routes/auth"));
app.use("/api/sauces", require("./routes/sauces"));

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
