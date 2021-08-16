const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRouter = require("./routes/user");

const checkError = require("./middleware/checkError");

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: "*"
}));
app.use("/api/auth", userRouter);
app.use(checkError);

module.exports = app;