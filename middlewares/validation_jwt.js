`use strict`
const {user,role}=require(`../models/database`)

function Validacion(){}

Validacion.prototype.revisarUsuarioyEmail=async(req,res,next)=>{
    const exists_user=await user.findOne({username:req.body.username})
    if(exists_user) return res.status(400).json({message:`Este nombre de usuario ya existe`})

    const exists_email=await user.findOne({email:req.body.email})
    if(exists_email)    return res.status(400).json({message:`Este email ya existe`})

    next()
}

Validacion.prototype.validarRoles=async(req,res,next)=>{
    if(req.body.roles){
        for(let i=0;i<req.body.roles.length;i++){
            const exist_role=await role.find({name:{$eq:req.body.roles[i]}})
            if(!exist_role.length)
                return res.status(400).json({message:`${req.body.roles[i]}: no es un rol válido`})
        }
    }
    next()
}

module.exports=new Validacion()