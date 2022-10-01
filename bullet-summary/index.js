const express = require('express')
const { OpenAIApi } = require('openai')
const {  bulletSummary } = require('./bulletSummary')
const { OpenAIConfiguration } = require('./config')
const bodyParser = require("body-parser");

const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

// Setting up of OpenAI
const openai = new OpenAIApi(OpenAIConfiguration);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})