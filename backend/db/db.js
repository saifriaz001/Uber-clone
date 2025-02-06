const mongoose = require("mongoose");

const connectDB = async() =>{
    try{

        const connectionInstance = await mongoose.connect(`${process.env.DB_CONNECT}`)
        console.log(`\n Mongodb connected !! DB HOST: ${connectionInstance} `)            
        }

     catch(error){
        console.log("MONGODB connection error", error)
        process.exit(1)

    }
}


module.exports = connectDB;