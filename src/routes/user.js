const { Router } = require('express');
const bcrypt = require('bcrypt');
const userSchema = require("../models/UserSchema");

const router = Router();
 
//Create User
router.post('/users', (req, res) => {   
    const user = userSchema(req.body);
 


    //Validaciones

    //Nombre
    if(!(/^[A-Za-z\s]*$/.test(user.name))){
        return res.status(400).json({
            ok: false,
            err:{
                message: "El nombre solamente puede contener letras."
            }
        })
    }

    //Apellidos
    if(!(/^[A-Za-z\s]*$/.test(user.lastname))){
        return res.status(400).json({
            ok: false,
            err:{
                message: "El apellido solamente puede contener letras."
            }
        })
    }

    //Username
    if((/^[A-Za-z0-9]*$/.test(user.username))){

        userSchema.count({username: user.username})
        .then((count)=>{
            if(count > 0){
                return res.status(400).json({
                    ok: false,
                    err:{
                        message: "El usuario ya existe."
                    }
                })
            }
        })        
    }else{
        return res.status(400).json({
            ok: false,
            err:{
                message: "El usuario solo puede tener letras y numeros sin espacios."
            }
        })
    }

    //Password
    if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(user.password))){
        return res.status(400).json({
            ok: false,
            err:{
                message: "La contraseña debe teber minimo 8 caracteres, al menos una minuscula, al menos una mayuscula, un numero y un caracter especial"
            }
        })
    }else{
        const passwordhash = bcrypt.hashSync(user.password, 10)
        user.password = passwordhash;
    }


    user.save()
    .then((data)=>res.json(data))
    .catch((error)=>res.json({message: error}))
})

//Get Users
router.get("/users",(req,res) =>{
    userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

//Get User By Id
router.get("/users/:id",(req,res) => {
    const {id} = req.params;
    userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

//User Login
router.post("/users/login",(req,res) => {
   
    let body = req.body;

    userSchema.findOne({username: body.username}, (erro, userDB) =>{
        
        if(erro){
            return res.status(500).json({
                ok: false,
                err: erro
            })
        }

        //Validar si existe el usuario
        if(!userDB){
            return res.status(400).json({
                ok: false,
                err:{
                    message: "Usuario o contrasena incorrectos."
                }
            })
        }

        //Validar user
        if(body.username === userDB.username && bcrypt.compareSync(body.password, userDB.password)){
            return  res.json({
                ok: true,
                usuario: userDB
            })
        }else{
            return res.status(400).json({
                ok: false,
                err:{
                    message: "Usuario o contrasena incorrectos."
                }
            })
        }
       
    })
})

//Update User
router.put("/users/:id",(req,res) => {
    const {id} = req.params;
    const {name,lastname,password,birthday,shortalks,isShortTalkUpload} = req.body;
    userSchema
    .updateOne({_id: id},{ $set: {name,lastname,password,birthday,shortalks,isShortTalkUpload} })
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})
 

//Delete User
router.delete("/users/:id",(req,res) => {
    const {id} = req.params;
    userSchema
    .deleteOne({_id: id})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})



module.exports = router;    