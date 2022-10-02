const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const { randomUUID } = require("crypto");
const { runInNewContext } = require("vm");
const axios = require("axios").default;

const app = express();
const port = 3001;
const uuid = randomUUID();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pdf_parser_api = "http://127.0.0.1:5000";
const animation_api = "";

app.use(
  cookieSession({
    name: "session",
    keys: [uuid],
  })
);

// https://attacomsian.com/blog/uploading-files-nodejs-express
app.post("/send-pdf", (req, res) => {
  console.log(req.body);
  axios
    .post(pdf_parser_api + "/upload", {
      pdf: req.body.file,
      uuid: uuid,
    }, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then((response) => {
      res.send(response);
      console.log(response);
      console.log(response.headers);
    })
    .catch((error) => {
      res.send(error);
      console.log(error);
    });
});

app.get("/transcript", (req, res) => {
  if (req.session["pdf_session"]) {
    axios
      .get(pdf_parser_api + "/transcript", {
        headers: {
          Cookie: "session=" + req.session["pdf_session"],
        },
      })
      .then((response) => {
        if (response.transcript) {
          req.session["transcript"] = response.transcript;
          res.send({ message: "Transcript recieved" });
        }
      });
  }
  res.status(500).send({ message: "An error has occurred" });
});

app.get("/animate", (req, res) => {
  if (req.session["pdf_session"] && req.session["transcript"]) {
    axios.get(animation_api + "/animate").then((response) => {
      if (response.video) {
        res.send({ video: response.video });
      }
    });
  } else {
    res
      .status(500)
      .send({ message: "You have not uploaded a PDF file to the server" });
  }
});

app.listen(3001, () => {});
