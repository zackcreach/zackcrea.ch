const express = require("express");
const path = require("path");
const helmet = require("helmet");

const app = express();
const port = 1337;

app.use(helmet());
app.use(express.static(path.resolve(__dirname, "./public")));

app.set("views", path.resolve(__dirname, "./src/views"));
app.set("view engine", "pug");

app.get("/*", (req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.setHeader("Expires", new Date(Date.now() + 86400).toUTCString());
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () =>
  console.log(`Listening on port ${port}\nhttp://0.0.0.0:${port}`)
);
