`use strict`

const mongoose=require(`mongoose`)
    Schema=mongoose.Schema,
    user_schema=new Schema({
        username:{
            type:String,
            unique:true
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        roles:[{//-RELACION DE UNO A MUCHOS ENTRE LA COLECCION DE ROLES Y USERS
            ref:`Role`,
            type:Schema.Types.ObjectId
        },]
    },{
        timestamps:true,
        versionKey:false
    })

module.exports=mongoose.model(`User`,user_schema)