`use strict`

const mongoose=require(`mongoose`),
    Schema=mongoose.Schema,
    product_schema=new Schema({
        name:String,
        category:String,
        price:Number,
        imgURL:String
    },{
        timestamps:true,
        versionKey:false
    })

module.exports=mongoose.model(`Product`,product_schema)