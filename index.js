const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = 5000;

// middle ware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uanva.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
    try{
        await client.connect();
        // console.log('connected to database');
        const database = client.db('adventureTours');
        const tourCollection = database.collection('tours');

        // post API
        app.post('/tours', async(req, res) => {
            
            console.log('hit the post api')

            // const result = await tourCollection.insertOne(tour);
            // console.log(result);

            res.send('post hitted')
        })
    }
    finally{
        // await client.close();
    }

}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('running wanderers adventure server');
});

app.listen(port, () => {
    console.log('running wanderers adventure server on port', port);
})