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


module.exports = router;