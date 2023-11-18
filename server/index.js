const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();

const cors = require("cors");
const router = require("./routes/route");
const DefaultData = require("./default");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Data base is connected successfully`);
  })
  .catch((error) => {
    console.log(`Failed to connected DataBase`, error.message);
  });
app.use("/", router);
app.listen(8000, () => {
  console.log(`server is listening in 8000 Port`);
});

DefaultData();
