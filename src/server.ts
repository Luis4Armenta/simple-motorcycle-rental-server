/* eslint-disable @typescript-eslint/no-floating-promises */
import { Server } from 'http'
import { app } from './app'
import { Server as SocketServer, Socket } from 'socket.io'
import mongoose from 'mongoose'

// mongoose connecion
mongoose.connect('mongodb://localhost/motorcycles', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('open connection')
})

const httpServer = new Server(app)
const io = new SocketServer(httpServer, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    allowedHeaders: 'authorization',
    credentials: true
  }
})

io.on('connection', (socket: Socket) => {
  console.log('connection')
})

httpServer.listen(3000, () => {
  console.log('Open Server')
})

export { httpServer }
