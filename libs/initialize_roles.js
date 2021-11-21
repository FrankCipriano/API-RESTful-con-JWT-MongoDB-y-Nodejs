`use strict`

const {role}=require(`../models/database`)

const createRoles=async()=>{
    try {
        const count=await role.estimatedDocumentCount()
        if(count>0) return

        const valores=await Promise.all([
            new role({name:`user`}).save(),
            new role({name:`moderator`}).save(),
            new role({name:`admin`}).save()
        ])
        console.log(valores)
    } catch (error) {
        console.log(error)
    }
}

module.exports=createRoles