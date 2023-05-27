const express = require('express');
const mongoose = require('mongoose')
require("dotenv").config()
const userRoutes = require('./routes/user') 
const PostRoutes = require('./routes/post')
const NotificationRoutes = require('./routes/notification')
const FollowRoutes = require('./routes/follow_routes')
const CategoryRoutes = require('./routes/category_routes.js')
var cors = require('cors');
const app = express();
const port = process.env.PORT || 3001

app.use(cors());

//middleware
app.use(express.json());
app.use('/api',userRoutes);
app.use('/api',PostRoutes);
app.use('/api',NotificationRoutes);
app.use('/api',FollowRoutes);
app.use('/api',CategoryRoutes);

//Routes
app.get('/',(req,res)=>{
    res.send("Welcome to my API")
})

//mongodb connection
mongoose.connect('mongodb://localhost:27017/Zapato', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
})
    .then(() => console.log('Conexión exitosa a la base de datos'))
    .catch(err => console.error(err));



app.listen(port,() => console.log('Server listening on port: ', port))
