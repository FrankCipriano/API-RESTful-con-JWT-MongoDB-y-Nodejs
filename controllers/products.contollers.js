`use strict`

const {product}=require(`../models/database`)

function Controlador(){}

Controlador.prototype.createProduct=async(req,res)=>{
    const {name,category,price,imgURL} =req.body,
        new_product=new product({name,category,price,imgURL}),
        product_saved=await new_product.save()
    res.status(201).json(product_saved)
}
Controlador.prototype.getProducts=async(req,res)=>{
    const the_products=await product.find()
    res.status(200).json(the_products)
}
Controlador.prototype.getProductById=async(req,res)=>{
    const the_product=await product.findById(req.params.productId)
    res.status(200).json(the_product)
}
Controlador.prototype.updateProductById=async(req,res)=>{
    const updated_product=await product.findByIdAndUpdate(req.params.productId,req.body,{new:true})
    res.status(200).json(updated_product)
}
Controlador.prototype.deleteProductById=async(req,res)=>{
    await product.findByIdAndDelete(req.params.productId)
    res.status(204).json()
}

module.exports=new Controlador()