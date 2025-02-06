const socketIo = require('socket.io')
const userModel = require("./models/user.model.js")
const captainModel = require("./models/captain.model")
let io;

function initalizeSocket(server){
    io=socketIo(server,{
        cors:{
            origin:'*',
            methods:['GET','POST']
        }
    });

    io.on('connection' ,(socket)=>{
        console.log(`client connected : ${socket.id}`);

        socket.on('join', async(data)=>{
            const {userId , userType} = data;

            console.log(`User ${userId} joined as ${userType}`)

            if(userType ==="user"){
                await userModel.findByIdAndUpdate(userId, {socketId:socket.id});
            } else if (userType === 'captain'){
                await captainModel.findByIdAndUpdate(userId, {socketId:socket.id});
            }
        })

        socket.on('update-location-captain', async(data)=>{
            const {userId , location } = data;

            if(!location || !location.lng || !location.ltd){
                return socket.emit('error',{message:"Invalid location data"})
            }
            console.log("printing location data  ->", location)

           const updateCaptain =  await captainModel.findByIdAndUpdate(userId , {
                location:{
                    ltd:location.ltd,
                    lng:location.lng
                }
            }, {new:true});

            if(!updateCaptain){
                return socket.emit('error', {message:"Captain not found"});
            }

        });

        socket.on('disconnect',()=>{
            console.log(`Client disconnected :${socket.id}`);

        });
    });
}

function sendMessageToScoketId(socketId, messageObject){
    console.log(`sending message to ${socketId}`, messageObject);
    if(io){
        io.to(socketId).emit(messageObject.event,messageObject.data);
    }else{
        console.log('Socket.io not initalized.');
    }
}

module.exports ={initalizeSocket , sendMessageToScoketId};