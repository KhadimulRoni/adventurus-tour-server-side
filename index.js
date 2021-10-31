const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId

const cors = require('cors');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

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
        const specialToursCollection = database.collection('specialTours');
        

        // GET API
        app.get('/specialTours', async(req, res) => {
            const cursor = specialToursCollection.find({});
            const specialTours = await cursor.toArray();
            res.send(specialTours);
        })

        app.get('/tours', async(req, res) => {
            const cursor = tourCollection.find({});
            const tours = await cursor.toArray();
            res.send(tours);

        })

        // Get single service
        app.get('/specialTours/:id', async (req, res) => {
            const id = req.params.id;
            console.log('getting special tour', id)
            const query = {_id: ObjectId(id)};
            const specialTour = await specialToursCollection.findOne(query);
            res.json(specialTour);
        } )



        // post API
        app.post('specialTours', async (req, res) => {
            const specialTour = req.body;
            const result = await specialToursCollection.insertOne(specialTour);
            res.json(result)
        })


        app.post('/tours', async(req, res) => {
            const tour = req.body;
            console.log('hit the post api',tour)

            const result = await tourCollection.insertOne(tour);
            console.log(result);

            res.json(result)
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