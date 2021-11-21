`use strict`

const express=require(`express`),
    router=express.Router(),
    crearUsuario=require(`../controllers/user.controller`),
    {jwt,validar}=require(`../middlewares/auth_and_valid`)

router.post(`/api/users`,[jwt.verificarToken, jwt.esAdmin, validar.validarRoles],crearUsuario)

module.exports=router