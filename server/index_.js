const express = require('express');
const app = express();
const port = 3000;

// Connect to MongoDB (as shown above)
const mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/your_database_name';

const val = mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then((res) =>{ console.log('MongoDB connected')
    console.log(res.connections[0].name)

})
.catch(err => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Connected to Express.js and MongoDB!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});