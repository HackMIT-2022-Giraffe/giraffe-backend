import { Configuration } from "openai"

require("dotenv").config()

export const OpenAIConfiguration = new Configuration({
    apiKey: process.env.OPENAI_KEY
});
