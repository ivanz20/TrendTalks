const {Router} = require('express');
const NotificationSchema = require ("../models/NotificationSchema")

const router = Router();

//Create Notification

router.post('/notification',(req,res) => {
    const notification = NotificationSchema(req.body)
    notification.save()
    .then((data)=> res.json(data))
    .catch((error)=>res.json({message: error}));
})

router.get('/notification/:username',(req,res)=>{
    const {username} = req.params;
    NotificationSchema
    .find({username: username},(erro,data)=>{
        if(erro){
            return res.status(500).json({
                ok:false,
                posts:erro
            })
        }
        if(data.length > 0){
            return res.status(500).json({
                ok: true,
                posts: data
            })
        }else{
            return res.status(400).json({
                ok: false,
                err:{
                    message: "El usuario aun no tiene notificaciones"
                }
            })
        }
    })
})

router.delete('/notification/:id',(req,res)=>{
    const {id} = req.params;
    NotificationSchema
    .deleteOne({_id:id})
    .then((data) => res.json(data))
    .catch((error) => res.json(error))
})

module.exports = router;