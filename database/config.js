const mongoose = require('mongoose');




const dbConnection = async () =>{
    
    try {
        await mongoose.connect( process.env.DB_MONGODB )

        mongoose.set('strictQuery',true)
        
        console.log('MongoDb esta funcionando')
        
    } catch (error) {
        console.log(error)
    throw new Error('Error en la base de datos por favor avisar al administrador')
   }

}

module.exports = {
    dbConnection
}