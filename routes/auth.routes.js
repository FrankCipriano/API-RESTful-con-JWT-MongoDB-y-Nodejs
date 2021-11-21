`use strict`

const express=require(`express`),
    router=express.Router(),
    controlador=require(`../controllers/auth.controller`),
    {validar}=require(`../middlewares/auth_and_valid`)

router.post(`/api/auth/signup`,[validar.revisarUsuarioyEmail, validar.validarRoles], controlador.signUp)
    .post(`/api/auth/signin`,controlador.singIn)

module.exports=router