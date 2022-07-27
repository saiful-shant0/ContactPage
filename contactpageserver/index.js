const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://Food_Masala:NmfHVC9X7YpuH5bR@cluster0.med0q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('All_Contact');
        const contactCollection = database.collection('contacts');

       
        app.post('/contacts', async (req, res) => {
            const contacts = req.body;


            const result = await contactCollection.insertOne(contacts);

            res.json(result)
        });

        app.get('/contacts', async (req, res) => {
            const cursor = contactCollection.find({});
            const contacts = await cursor.toArray();
            res.send(contacts);
        });



    }
    finally {
        // await client.close()
    }

}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('server is running');
})

app.listen(port, () => {
    console.log('Server running at port', port)
})