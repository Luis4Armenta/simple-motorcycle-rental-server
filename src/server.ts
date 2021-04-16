/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { Server as SocketServer, Socket } from 'socket.io'
import { Server } from 'http'
import { app } from './app'

mongoose.connect('mongodb://localhost/motorcycles', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
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

io.use((socket: Socket | any, next) => {
  if (socket.handshake.query?.token) {
    if (typeof (socket.handshake.query.token) === 'string') {
      jwt.verify(socket.handshake.query.token, 'secretWord', (err: any, decoded: any) => {
        if (err) Error('the token could not be decoded')
        socket.decoded = decoded.id
        next()
      })
    } else {
      console.log('The token is not what was expected')
      next(new Error('Authentication error'))
    }
  }
})

httpServer.listen(3000, () => {
  console.log('the server is running!..')
})

export { httpServer }
