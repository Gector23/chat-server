const http = require("http");

const app = require("./app");

const PORT = process.env.PORT || 5000;
app.set("port", PORT);

const server = http.createServer(app);
server.on("error", err => {
  console.log(err);
});
server.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});