const cors = require('cors');
const express = require('express');
const app = express()
// Conectar a socket.io
const http = require('http');
const { Server : ServerSocket } = require("socket.io");
const server = http.createServer(app);
const io = new ServerSocket(server);

const ComidaSchema = require('../models/comida');


require('dotenv').config()

const port = process.env.PORT;


class Server {


    constructor(){
       
        this.middlewares()

        this.socketConnection()

        this.router()

    }

    middlewares(){
        // Seguridad de rutas 

        app.use(cors())

        // uso del html 
        app.use( express.static('public') )

        // formato para recibir las cosas 

        app.use(express.json())
    }

    listen(){
        server.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }

    socketConnection(){

        io.on('connection', (socket) => {

            busquedaComida()
            this.router()
            
          });
    }

    router(){
        app.use('/api/comida', require('../routes/comida.routes')) //TODO : faltan las imagenes 
        app.use('/api/bebidas', require('../routes/bebidas.routes'))
    }

    


}

const busquedaComida = async()=> {
    const food = await ComidaSchema.find()
    io.emit("pedidos", food)
}


module.exports = {Server, io, busquedaComida}