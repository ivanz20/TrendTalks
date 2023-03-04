const {Router} = require('express');
const FollowSchema = require("../models/FollowerSchema");


const router = Router();

router.post('/follow', (req,res) =>{
    const follow = FollowSchema(req.body);
    follow.save()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message: error}));
});

router.get('/follow/:seguidor', (req,res) => {
    const {seguidor} = req.params;
        FollowSchema
        .find({seguidor: seguidor},(erro,data) => {
            
            if(erro){
                return res.status(500).json({
                    ok: false,
                    err: erro
                })
            }
            if(data.length > 0){
                return res.status(500).json({
                    ok: true,
                    followers: data
                })
            }else{
                return res.status(400).json({
                    ok: false,
                    err:{
                        message: "El usuario no sigue a nadie."
                    }
                })
            }
        }).sort({
            followedsince: -1
        })
});

router.get('/follow/myfollowers/:seguido', (req,res) => {
    const {seguido} = req.params;
        FollowSchema
        .find({seguido: seguido},(erro,data) => {
            
            if(erro){
                return res.status(500).json({
                    ok: false,
                    err: erro
                })
            }
            if(data.length > 0){
                return res.status(500).json({
                    ok: true,
                    followers: data
                })
            }else{
                return res.status(400).json({
                    ok: false,
                    err:{
                        message: "Al usuario no lo sigue nadie :(."
                    }
                })
            }
        }).sort({
            followedsince: -1
        })
});

router.post('/follow/profile/', (req,res) => {
    const info = req.body;
        FollowSchema
        .find({seguido: info.seguido, seguidor: info.seguidor},(erro,data) => {
            if(erro){
                return res.status(500).json({
                    ok: false,
                    err: erro
                })
            }
            if(data.length > 0){
                return res.status(500).json({
                    isfollowed: true
                })
            }else{
                return res.status(400).json({
                    isfollowed: false
                })
            }
        }).sort({
            followedsince: -1
        })
});

router.delete("/follow/:username2",(req, res) => {
        const {username2} = req.params;
        FollowSchema
        .deleteOne({username2:username2})
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
});

module.exports = router;