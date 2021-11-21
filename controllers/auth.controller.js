`use strict`

const {user,role}=require(`../models/database`),
    bcrypt=require(`bcryptjs`),
    jwt=require(`jsonwebtoken`),
    secret_word=require(`../config`)

function Controlador(){}

Controlador.prototype.encriptarContrasenia=async(password)=>{
    const salt=await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}

Controlador.prototype.compararContrasenia=async(password,received_password)=>{
    return await bcrypt.compare(password,received_password)
}

Controlador.prototype.signUp=async(req,res)=>{
    const {username,email,password,roles}=req.body,
        new_user= new user({
            username,
            email,
            password: await new Controlador().encriptarContrasenia(password)
        })

    if(roles){
        const roles_found=await role.find({name:{$in:roles}})
        new_user.roles=roles_found.map((role)=>role._id)
    }else{
        const the_role=await role.findOne({name:`user`})
        new_user.roles =[the_role._id]
    }

    const saved_user=await new_user.save(),
        token=jwt.sign({id:saved_user._id},secret_word.SECRET,{expiresIn:86400})//-24 hrs
    console.log(saved_user)
    res.status(201).json({token})
}

Controlador.prototype.singIn=async(req,res)=>{
    const user_found=await user.findOne({email:req.body.email}).populate(`roles`)
    if(!user_found) return res.status(404).json({message:`usuario no encontrado`})

    const pass_correcto=await new Controlador().compararContrasenia(req.body.password,user_found.password)
    if(!pass_correcto)  return res.status(401).json({token:null,message:`contrasenia incorrecta`})

    const token=jwt.sign({id:user_found._id},secret_word.SECRET,{expiresIn:86400})//-24hrs
    res.status(200).json({token})
}

module.exports=new Controlador()