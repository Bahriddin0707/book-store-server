const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { PORT, MONGO_URL } = require("./config");

const app = express();

// Use CORS middleware
app.use(cors());

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/books", require("./routes/bookRoutes"));

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("The server connected to Database");
    app.listen(PORT, () => {
      console.log(`The server is listening ${PORT} port`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
