`use strict`
const jwt=require(`jsonwebtoken`),
    {user,role}=require(`../models/database`),
    secret_word=require(`../config`)

function Jwt(){}

Jwt.prototype.verificarToken=async(req,res,next)=>{
    try {
        const token=req.headers[`x-access-token`]
        if(!token)  return res.status(403).json({message:`el usuario no poseé token`})

        const decifrar_token=jwt.verify(token,secret_word.SECRET)
        req.userId=decifrar_token.id//-CREAR UN ATRIBUTO AL REQUEST PARA ALMACENAR EL TOKEN

        const the_user=await user.findById(req.userId,{password:0})
        if(!the_user)   return res.status(404).json({message:`usuario no encontrado`})
        next()
    } catch (error) {
        return res.status(401).json({message:`No tienes los privilegios para esta acción`})
    }
}
Jwt.prototype.esModerador=async(req,res,next)=>{
    const the_user=await user.findById(req.userId),
        the_roles=await role.find({_id:{$in:the_user.roles}})
    
    for(let i=0;i<the_roles.length;i++){
        if(the_roles[i].name===`moderator`){
            return next();
        }
    }
    return res.status(403).json({message:`Debes ser un moderador para ejecutar esta acción`})
}
Jwt.prototype.esAdmin=async(req,res,next)=>{
    const the_user=await user.findById(req.userId),
        the_roles=await role.find({_id:{$in:the_user.roles}})
    
    for(let i=0;i<the_roles.length;i++){
        if(the_roles[i].name===`admin`){
            return next();
        }
    }
    return res.status(403).json({message:`Debes ser un administrador para ejecutar esta acción`})
}

module.exports=new Jwt()