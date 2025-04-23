const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const port = 3001;

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for frontend communication
app.use(cors());

// Endpoint to interact with OpenRouter API
app.post("/api/chat", async (req, res) => {
  try {
    const userInput = req.body.message;

    // Check if userInput exists
    if (!userInput) {
      console.log("Error: No user input provided");
      return res.status(400).json({ error: "Message is required." });
    }

    console.log("Received user input:", userInput);  // Debugging line

    // OpenRouter API request
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",  // Ensure the URL is correct for OpenRouter
      {
        model: "gpt-3.5-turbo", // Verify the model with OpenRouter docs
        messages: [{ role: "user", content: userInput }],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, 
          "Content-Type": "application/json",
        },
      }
    );

    console.log("OpenRouter API Response:", response.data);

    // Send OpenRouter response back to frontend
    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    console.error("Error:", err.response || err.message);  // More detailed error logging
    res.status(500).json({ error: "Error fetching response from OpenRouter." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
