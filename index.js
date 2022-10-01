const express = require('express')
const { OpenAIApi } = require('openai')
const { default: bulletSummary } = require('./bulletSummary')
const { OpenAIConfiguration } = require('./config')
const app = express()
const port = 3000

// Setting up of OpenAI
const openai = new OpenAIApi(OpenAIConfiguration);
await bulletSummary(openai, text)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})