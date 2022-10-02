const { Configuration } = require( "openai" );

require("dotenv").config()

exports.OpenAIConfiguration =  new Configuration({
    apiKey: process.env.GPT3_API_KEY
});
