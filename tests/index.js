const express = require('express');
const cors = require("cors")
const app = express();
const port = 5000; // Or any other port

const corsOptions = {
    origin: 'http://localhost:3100', // Replace with your React app's origin
    // Allow specific methods
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // Allow specific headers
    allowedHeaders: "Content-Type, Authorization",
    credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// ... (previous server setup code)

app.get('/objects', (req, res) => {
  // Generate or fetch 100 objects
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      ud: i + 1,
      name: `Object ${i + 1}`,
      value: Math.random() * 100, // Example data
    });
  }

  // Send the array of objects as a JSON response
  res.json(data);
});


app.get('/', (req, res) => {
  // Generate or fetch 100 objects


  // Send the array of objects as a JSON response
  res.json({message :"hello from test server"});
});

app.get('/objects/:id', (req, res) => {
  // Generate or fetch 100 objects
  const id = req.params.id
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      id: i + 1,
      name: `Object ${i + 1}`,
      value: Math.random() * 100, // Example data
    });
  }

  // Send the array of objects as a JSON response
  const result = data[id - 1]
  res.json(result);
});