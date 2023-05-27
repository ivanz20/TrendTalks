const { Router } = require('express');
const bcrypt = require('bcrypt');
const userSchema = require("../models/UserSchema");
var promise = require("promise");

const router = Router();
 

//Create User
router.post('/users', (req, res) => {

    const user = userSchema(req.body);
    //Validaciones
    //Nombre
    if(!(/^[A-Za-z\s]*$/.test(user.name))){
        console.log("El nombre esta mal")
        return res.status(400).json({
            ok: false,
            err:{
                message: "El nombre solamente puede contener letras."
            }
        })
    }

    //Apellidos
    if(!(/^[A-Za-z\s]*$/.test(user.lastname))){
        console.log("El apellido esta mal")
        return res.status(400).json({
            ok: false,
            err:{
                message: "El apellido solamente puede contener letras."
            }
        })
    }

    //Username
    if(!(/^[A-Za-z0-9]*$/.test(user.username))){  
        console.log("El usuario esta mal")  
        return res.status(400).json({
            ok: false,
            err:{
                message: "El usuario solo puede tener letras y numeros sin espacios."
            }
        })
    }

    //Password
    if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(user.password))){
        console.log("La password esta mal")
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


    userSchema.findOne({username: user.username},(erro, data) => {
        if(erro){
            return res.status(500).json({
                ok: false,
                err: erro
            })
        }
        if(!data){
            userSchema.findOne({email: user.email},(erro, data2) => {
                if(erro){
                    return res.status(500).json({
                        ok: false,
                        err: erro
                    })
                }
                if(!data2){
                    user.save()
                    .then((data2)=>res.json(data2))
                    .catch((error)=>res.json({message: error}))
                }
                else{
                    console.log("El email ya esta registrado")
                    return res.status(400).json({
                        ok: false,
                        err:{
                            message: "El email ya esta registrado."
                        }
                    })
                }
            });
               
        }
        else{
            console.log("El usuario ya existe")
            return res.status(400).json({
                ok: false,
                err:{
                    message: "El usuario ya existe."
                }
            })
        }
    });
    
});


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
    const {name,lastname,password,birthday} = req.body;
    userSchema
    .updateOne({_id: id},{ $set: {name,lastname,password,birthday} })
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

//Update User Short
router.put("/users/uploadshort/:id",(req,res) => {
    const {id} = req.params;
    const {shortalks,isShortTalkUpload} = req.body;
    userSchema
    .updateOne({_id: id},{ $set: {shortalks,isShortTalkUpload} })
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
