`use strict`

const mongoose=require(`mongoose`),
    product=require(`./product`),
    user=require(`./user`),
    role=require(`./role`)
    models={
        user,
        product,
        role
    }

mongoose.connect(`mongodb://127.0.0.1/CompanyDB`)

module.exports=models