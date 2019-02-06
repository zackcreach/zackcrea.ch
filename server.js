const express = require("express");

const app = express();
const port = 1337;

app.use(express.static("public"));
app.set("views", "./src/views");
app.set("view engine", "pug");

app.get("/", (req, res) => res.render("index"));

app.listen(port, () =>
  console.log(`Listening on port ${port}\nhttp://0.0.0.0:${port}`)
);
