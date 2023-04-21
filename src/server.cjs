const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5174;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/recommendations', async (req, res, next) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/engine/chat', {
      "prompt": `Recommendations to travel to ${req.body.destination} on ${req.body.date} with a budget of ${req.body.budget}`,
      "temperature": 0.5,
      "max_tokens": 60,
      "stop": "\n"
    }, {
      headers: {
        "Authorization": `Bearer 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`,
        "Content-Type": "application/json",
        "Model": "davinci"
      }
    });
    res.json(response.data.choices.map(choice => choice.text));
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
