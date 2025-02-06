const express = require ('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const mapRoutes = require("./routes/maps.routes");
const rideRoutes = require("./routes/ride.routes")
const connectDB = require("./db/db");
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

connectDB();

app.get('/', (req, res)=>{
    res.send("hello world");
})

app.use('/users', userRoutes);
app.use('/captains',captainRoutes);
app.use('/maps',mapRoutes);
app.use('/rides', rideRoutes);

module.exports = app;