const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

const aylien = require("aylien_textapi");
const textapi = new aylien({
  application_id: process.env.APP_ID,
  application_key: process.env.API_KEY,
});

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("dist"));

app.post("/nlp", async (req, res) => {
  console.log(req.body);
  const { url } = req.body;
  if (urlRegex.test(url)) {
    textapi.sentiment({ url }, function (error, response) {
      if (error === null) {
        res.json(response);
      } else {
        res.status(500).send("Problems with api!");
      }
    });
  } else {
    res
      .status(422)
      .send("Missing parameters: Please provide url to article or blog post!");
  }
});

app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
