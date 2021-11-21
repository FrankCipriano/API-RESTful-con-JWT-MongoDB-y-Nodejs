`use strict`
//-MIDDLEWARES
const express=require(`express`),
    morgan=require(`morgan`),
    port=(process.env.PORT || 3000),
    pkg=require(`./package.json`),
    app=express(),
    cors=require(`cors`)

//-MODULES
const products_routes=require(`./routes/products.routes`),
    auth_routes=require(`./routes/auth.routes`),
    user_routes=require(`./routes/user.routes`)
    createRoles=require(`./libs/initialize_roles`)

//-THE APP CONFIGURATION
createRoles()
app.set(`pkg`,pkg)
    .set(`port`,port)
    .use(cors())
    .use(morgan(`dev`))
    .use(express.json())
    .get(`/`,(req,res)=>{
        res.json({
            name:app.get(`pkg`).name,
            description:app.get(`pkg`).description,
            author:app.get(`pkg`).author,
            version:app.get(`pkg`).version
        })
    })
    .use(products_routes)
    .use(auth_routes)
    .use(user_routes)

module.exports=app