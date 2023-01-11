// const {io , server} = require('./socket.io/socket')

const {Server} = require('./server/express')


const { dbConnection } = require('./database/config')


dbConnection()

const server = new Server()

server.listen()


