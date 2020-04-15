const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes")
//const db = require("./models");

const PORT = process.env.PORT || 4000;

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/Covid_Tracker";
mongoose.connect(MONGODB_URI, {useUnifiedTopology: true,  useNewUrlParser: true });

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(routes)


// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

