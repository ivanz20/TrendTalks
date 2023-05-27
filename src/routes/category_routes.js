const {Router} = require('express');
const CategorySchema = require("../models/CategoriesSchema");
const PostSchema = require("../models/PostSchema.js")

const router = Router();


//Get Users
router.get("/categories",(req,res) =>{
    CategorySchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: "No hay categorias"}))
});


router.post("/categories/filtro",async(req,res) => {
    let body = req.body;
    const data = await PostSchema.find({category: body.categoria}).sort({post_date:-1});
    console.log(data)
    return res.status(200).json({posts: data});
})

module.exports = router;