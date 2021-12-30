var express = require("express");
var cors = require("cors");
require("dotenv").config();
var app = express();
const formidable = require("formidable");

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", (req, res, next) => {
  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    if (err) {
      console.error("Error", err);
      throw err;
    }
    const { originalFilename, mimetype, size } = files.upfile;

    res.json({ name: originalFilename, tpype: mimetype, size: size });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
