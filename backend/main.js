const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const user = require('./models/user');
const { captureRejectionSymbol } = require('ws');

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
    await mongoose.connect('mongodb://127.0.0.1:27017/talkme');
};

// app.get('/',async(req,res)=>{
//     try {
//         const user1 = await user.insertOne({
//         name:'tushar',
//         email:'tushar@gmail.com',
//     });
//     console.log(user1);
//     res.json(user1);
//     } catch (error) {
//         console.log(error)
//     };
// });

app.get('/user',async(req,res)=> {
    try {
    const userFind = await user.find({});
    res.send(userFind);
    } catch (error) {
       console.log(error);
    }
});

app.get('/api/delete',async(req,res) => {
    try {
        const deletedUsers = await user.deleteMany({});
        res.json(deletedUsers);
    } catch (error) {
        console.log(error);
    }
})

app.listen(8080,() => {
    console.log(`port is listening at http://localhost:8080`);
});

