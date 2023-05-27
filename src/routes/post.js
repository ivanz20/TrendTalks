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
    const data = await PostSchema.find()
    console.log("xdxxd")
    return res.status(200).json({ posts: data });

    //  console.log(data)

    //        .then((data

    //          ) => res.json(data))
    //     .catch((err) => {
    //        console.error(err);
    //       res.status(500).json({ error: err });
    //  });
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

//Get Post by id
router.get("/talkie/post/:id", (req, res) => {
    const { id } = req.params;
    PostSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

//Update Post
router.put("/talkie/:id", (req, res) => {
    const { id } = req.params;
    const { post_content, hashs, likes, comments, photo_post, video_post } = req.body;
    PostSchema
        .updateOne({ _id: id }, { $set: { post_content, hashs, likes, comments, photo_post, video_post, category } })
        .then((data) => res.json(data))
        .catch((error) => res.json(error))
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