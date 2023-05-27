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


router.post("/categories/filtro",(req,res) => {
    let body = req.body;
    PostSchema.findOne({category: body.categoria}, (erro, postcategoria) => {
        console.log(postcategoria)
    

        if(!postcategoria){
            return res.status(400).json({
                ok: false,
                err:{
                    message: "No hay post de esta categoria."
                }
            })
        }

        if(postcategoria){
            return res.json({
                ok: true,
                postscategorias: postcategoria
            })
        }

    })
})

module.exports = router;