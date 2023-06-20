const express = require('express');
const cors = require('cors');
const { OpenAI } = require("langchain/llms/openai");
const app = express();
app.use(express.json()); // Middleware for parsing JSON bodies from HTTP requests
app.use(cors());

const model = new OpenAI({ openAIApiKey: "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", temperature: 0.9 }); // fill with actual OpenAI API key

app.post('/chatbot', async (req, res) => {
  try {
    const userMessage = req.body.message;
    // Here we would generate a response from the chatbot
    const chatbotResponse = await model.call(userMessage);
    res.send({ message: chatbotResponse });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to generate a response' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});