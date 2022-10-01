const express = require('express')
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const { randomUUID } = require('crypto');
const axios = require('axios').default

const app = express()
const port = 3001
const uuid = randomUUID()

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())


app.use(cookieSession({
    name: 'session',
    keys: [uuid]
}));

// https://attacomsian.com/blog/uploading-files-nodejs-express
app.post('/send-pdf', (req, res) => {
    axios.post("localhost:5000", {
        file: req.body.file,
        session: uuid
    }).then((res) => {
        console.log(res)
    })
});