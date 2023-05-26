const express = require('express');
const mongoose = require('mongoose')
require("dotenv").config()
const userRoutes = require('./routes/user') 
const PostRoutes = require('./routes/post')
const NotificationRoutes = require('./routes/notification')
const FollowRoutes = require('./routes/follow_routes')

const app = express();
const port = process.env.PORT || 3001


//middleware
app.use(express.json());
app.use('/api',userRoutes);
app.use('/api',PostRoutes);
app.use('/api',NotificationRoutes);
app.use('/api',FollowRoutes);

app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = ['http://localhost:3001', 'https://trendtalks-service.onrender.com', 'https://trendtalks.onrender.com'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

//Routes
app.get('/',(req,res)=>{
    res.send("Welcome to my API")
})


//mongodb connection

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('Connected to MongoDB Atlas'))
.catch((error) => console.log(error));


app.listen(port,() => console.log('Server listening on port: ', port))