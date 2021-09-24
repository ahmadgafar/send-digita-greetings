var express = require("express");
var router = express.Router();
var fs = require("fs");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

require("dotenv").config();
const mailjet = require("node-mailjet").connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

const PARENT_DIRECTORY = require("path").resolve(__dirname, "..");

// we need to encode the image to base64 so that we can send it as an attachement
// with the email
const base64Content = fs.readFileSync(
  PARENT_DIRECTORY + "/public/images/logo.png",
  { encoding: "base64" }
);

router.post("/", function (req, res, next) {
  console.log(req.body.recipients)
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "ahmad.gafar.test@gmail.com",
          Name: "Test User",
        },
        To: req.body.recipients,
        Subject: req.body.subject,
        TextPart: req.body.message,
        Attachments: [
          {
            ContentType: "image/pnh",
            Filename: "logo.png",
            Base64Content: base64Content,
          },
        ],
      },
    ],
  });
  request
    .then((result) => {
      res.send("successful");
    })
    .catch((err) => {
      res.send("fail");
    });
});

module.exports = router;
