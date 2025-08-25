const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const user = require('./models/user');
const {Server} = require('socket.io');
const http = require('http');
const Message = require('./models/message');
const bcryptjs = require('bcryptjs');
const User = require('./models/user');
// const userRouter = require('./routes/userRoutes.js');

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Database setup
main().then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.log('unable to connect to database'+err);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/talkme');
};

// app.post('/',async(req,res)=>{
//     const {name,password,email} = req.body;
//         const salt = bcryptjs.genSaltSync(10);
//         const hashedPassword = bcryptjs.hashSync(password,salt);
//         // const newUser = await User({name,email,hashedPassword});
//         console.log(hashedPassword);
//         newUser = new User({name:name,password:hashedPassword,email:email});
//         await newUser.save();
//         console.log(newUser);
//         res.json(
//             {
//                 ok : true,
//                 token:'secret token',
//             }
//         );
// });

// app.use('/',userRouter);

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:['GET','POST']
    }
});

io.on("connection",(socket) => {
    console.log("New client connected"+socket.id);  //New client connected

    //Join in a room based on user id
    socket.on("joinRoom",(userId) => {
        socket.join(userId);
    });

    //Receive broadcast message
    socket.on('sendMessage',async({sendBy,receivedBy,message}) => {
        const newMessage = new Message({sendBy,receivedBy,message});
        const saved = await newMessage.save();
        console.log(saved);

        io.to(receivedBy).emit('receivedMessage',{
            sendBy,
            receivedBy,
            message,
            createdAt: saved.createdAt,
        })
    });

    socket.on('disconnect',() => {
        console.log('Client Disconnected');
    });
});

server.listen(8080,() => {
    console.log('server is live http://localhost:8080');
});


