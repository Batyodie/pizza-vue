const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./public/db.json");
const middlewares = jsonServer.defaults({
  static: "./dist",
});

const PORT = process.env.PORT || 3001;

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
  console.log("Server is running");
  console.log(PORT);
});
