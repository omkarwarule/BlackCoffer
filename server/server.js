const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

// MongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017';
const dbName = 'Blackcoffer';

// Define a route for retrieving data
app.get('/data', async (req, res) => {
  try {
    // Connect to MongoDB
    const client = await mongodb.MongoClient.connect(mongoURL);
    const db = client.db(dbName);

    // Retrieve data from a collection 
    const collection = db.collection('Black');
    const data = await collection.find().toArray();

    // Close the connection
    client.close();

    // Send the data as a response
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});