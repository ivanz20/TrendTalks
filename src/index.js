const express = require('express');
const mongoose = require('mongoose')
require("dotenv").config()
const userRoutes = require('./routes/user') 

const app = express();
const port = process.env.PORT || 3001

//middleware
app.use(express.json());
app.use('/api',userRoutes);

//Routes
app.get('/',(req,res)=>{
    res.send("Welcome to my API")
})


//mongodb connection

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('Connected to MongoDB Atlas'))
.catch((error) => console.log(error));


app.listen(port,() => console.log('Server listening on port: ', port))