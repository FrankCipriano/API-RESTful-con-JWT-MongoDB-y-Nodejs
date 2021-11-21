`use strict`

const express=require(`express`),
    router=express.Router(),
    controlador=require(`../controllers/products.contollers`),
    {jwt}=require(`../middlewares/auth_and_valid`)

router.post(`/api/products`,[jwt.verificarToken,jwt.esModerador],controlador.createProduct)
    .get(`/api/products`,controlador.getProducts)
    .get(`/api/products/:productId`,controlador.getProductById)
    .put(`/api/products/:productId`,[jwt.verificarToken, jwt.esAdmin],controlador.updateProductById)
    .delete(`/api/products/:productId`,[jwt.verificarToken,jwt.esAdmin],controlador.deleteProductById)

module.exports=router