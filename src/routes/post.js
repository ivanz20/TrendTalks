const { Router } = require('express');
const PostSchema = require("../models/PostSchema");
var promise = require("promise");

const router = Router();

//Create Post
router.post('/talkie', (req, res) => {

    const talkie = PostSchema(req.body);
    talkie.save()
        .then((data) => res.json(data))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});

//Get Posts
router.get('/talkie', async (req, res) => {
    const data = await PostSchema.find().sort({post_date:-1})
    return res.status(200).json({ posts: data });

})

//Get Post by Username
router.get("/talkie/:username", (req, res) => {
    const { username } = req.params;
    PostSchema
        .find({ username: username }, (erro, data) => {

            if (erro) {
                return res.status(500).json({
                    ok: false,
                    err: erro
                })
            }
            if (data.length > 0) {
                return res.status(500).json({
                    ok: true,
                    posts: data
                })
            } else {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "El usuario no tiene posts"
                    }
                })
            }
        })
});

//Get Posts by Likes
router.get("/talkie/count/likes", (req, res) => {
    PostSchema
        .find().sort({likes:-1})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});


//Get Posts by Hashs
router.get("/talkie/count/hash", (req, res) => {
    PostSchema
    .find({}, (erro, data) => {

        if (erro) {
            return res.status(500).json({
                ok: false,
                err: erro
            })
        }
        if (data.length > 0) {
            var auxarray = []
            for (var x in data){
                var aux = data[x]["hashs"];
                aux = aux.split("#")
                var auxarray = data[x];
                var auxilio = JSON.stringify(aux);
                auxarray[x] = data[x]
                auxarray[x]["hashs"] = auxilio;
                // auxarray[x]["counthash"] = aux.length()-1;

            }
            var json2 = JSON.stringify(auxarray);
            return res.status(500).json({
                ok: false,
                posts: json2
            })
        } else {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El usuario no tiene posts"
                }
            })
        }
    })
});


//Get Post by id
router.get("/talkie/post/:id", (req, res) => {
    const { id } = req.params;
    PostSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})



//Delete Post
router.delete("/talkie/:id", (req, res) => {
    const { id } = req.params;
    PostSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
})

module.exports = router;