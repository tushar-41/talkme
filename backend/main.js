const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//Middlewares
app.use(cors());

//Database setup
main().then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.log('unable to connect to database'+err);
});

async function main(){
    await mongoose.connect('');
}

