const express = require('express');
const { MongoClient } = require('mongodb');
require("dotenv").config();

const app = express();
const port = 5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uanva.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
    try{
        await client.connect();
        console.log('connected to database');
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