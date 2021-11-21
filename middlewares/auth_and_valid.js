const autorizaciones=require(`./auth_jwt`),
    validar=require(`./validation_jwt`)

module.exports={jwt:autorizaciones,validar}