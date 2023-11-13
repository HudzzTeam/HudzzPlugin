var path = require("path");
var express = require("express");

var DIST_DIR = path.join("/dist/");
var PORT = 3001;
var app = express();

express.static.mime.define({
  'application/javascript': ['js'],
  'text/css': ['css']
});

app.use(express.static(DIST_DIR));

app.get("/plugin/*", function (req, res) {
  res.sendFile(path.join(DIST_DIR, "/plugin/", "index.html"));
});

app.get("*", function (req, res) {
  res.redirect("/plugin/");
});

app.listen(PORT);
