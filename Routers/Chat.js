const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const Chat = express.Router();

// Set up OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

Chat.get("/", (req, res) => {
  res.send("Chat Router Is Running");
});

Chat.post("/chatting", async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.message,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.json(response.data.choices[0].text);
  } catch (error) {
    console.log(error);
  }
});

module.exports = Chat;
