const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
const Item = require('./models/item'); // Assuming 'item.js' in a 'models' folder
const startconnection = require('./connection');
const { ObjectId } = require('mongodb'); // or ObjectID

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your React app's origin
    // Allow specific methods
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // Allow specific headers
    //allowedHeaders: "Content-Type, Authorization",
    credentials: true, // Allow cookies to be sent
};



const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));


// Create (C)
app.post('/items/', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Read (R) - Get all items
app.get('/items/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Read (R) - Get a single item by ID
app.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update (U)
app.patch('/items/:id', async (req, res) => {
    try {
        const updatedItem = await Item.updateOne({ _id: new ObjectId(req.params.id) },
      { $set: req.body } , { returnOriginal: false } // Return the modified document

    );
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/items/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findOneAndReplace({ _id: new ObjectId(req.params.id) },
      { ...req.body },  { returnOriginal: false } // Return the modified document
    );
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Update (U)
// app.put('/items/:id', async (req, res) => {
//     try {
//         const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
//         res.json(updatedItem);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// Delete (D)
app.delete('/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete (D)
app.delete('/items/', async (req, res) => {
    try {
        const deletedItem = await Item.deleteMany();
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
startconnection();

// Start the server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

