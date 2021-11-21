`use strict`

const mongoose=require(`mongoose`),
    Schema=mongoose.Schema,
    role_schema=new Schema({
        name:String,
    },{
        versionKey:false,
    })

module.exports=mongoose.model(`Role`,role_schema)