const express = require('express')
const { OpenAIApi } = require('openai')
const {  bulletSummary } = require('./bulletSummary')
const { OpenAIConfiguration } = require('./config')
const cors = require('cors');

const app = express()
const port = 3001

app.use(cors({
  origin: "*"
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting up of OpenAI
const openai = new OpenAIApi(OpenAIConfiguration);

app.post('/bullet', async (req, res) => {
  console.log("begin")
  let simpText = req.body.simpText;
  let bulletResp = await bulletSummary(openai, simpText);
  console.log(typeof bulletResp)
  console.log("end")
  res.send({
    "bullets": bulletResp.data.choices[0].text.split(". ")
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})