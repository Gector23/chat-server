const express = require("express");
const bodyParser = require("body-parser");

const authRouter = require("./routes/auth");

const checkError = require("./middleware/checkError");

const app = express();

app.use(bodyParser.json());
app.use("/api/auth", authRouter);
app.use(checkError);

module.exports = app;