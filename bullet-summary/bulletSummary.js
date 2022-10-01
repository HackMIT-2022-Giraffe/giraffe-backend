
// requires "Tl;dr" at end of string to know to summarize
async function bulletSummary(openai, inputText) {
    const resp = await openai.createCompletion(
        {
            model: "text-davinci-002",
            prompt: inputText,
            temperature: .2,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        }
    )
    return resp
}

exports.bulletSummary = bulletSummary