const mongoose = require("mongoose")
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minLength:[3,'firstname must be at least 3 characters long'],
        },
        lastname:{
            type:String,
            minlength:[3,'lastname must be at Least 3 characters Long'],
        }
    },
    email:{
        type:String,
        required:true,
        unqiue:true,
        lowercase:true,
        match:[/\S+@\S+\.\S+/,'Please enter a valid email address'],
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive"
    },
    location:{
        ltd:{
            type:Number,
        },
        lng:{
            type:Number
        }
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'color must be at least 3 characters long'],
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'plate must be at least 3 characters long']
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'capacity must be at least 1'],
        },
        vehicleType:{
            type:String,
            required:true,
            enum:["motocycle","car","auto"],
        }
    },
      

})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this.id} , process.env.JWT_SECRET, {expiresIn:'24h'});
    return token;
}


captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

captainSchema.methods.comparePassword = async function(password){
    try {
        return await bcrypt.compare(password, this.password);

    }catch(error){
        throw new Error("Error comparing password");

    }

}
const captainModel = mongoose.model('captain', captainSchema);
module.exports = captainModel;