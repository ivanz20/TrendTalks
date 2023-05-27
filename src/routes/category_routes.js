const {Router} = require('express');
const CategorySchema = require("../models/CategoriesSchema");


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
    CategorySchema
    .findOne({categoria: body.categoria}, (erro, postcategoria) => {

        if(error){
            return res.status(400).json({
                ok: false,
                err: erro
            })
        }

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