require("dotenv").config();
const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");

mongoose.connect("mongodb+srv://Chat:123321@cluster0.xssm5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection to database failed");
  });

const PORT = process.env.PORT || 5000;
app.set("port", PORT);

const server = http.createServer(app);
server.on("error", err => {
  console.log(err);
});
server.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});