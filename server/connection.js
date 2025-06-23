const mongoose = require('mongoose');

// Connect to MongoDB locally

const startconnection =()=>{
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));
}

module.exports = startconnection