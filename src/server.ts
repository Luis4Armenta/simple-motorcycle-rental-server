/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { takeMotorcycleUseCase } from './useCases/takeMotorcycle'
import { getAllMotorcyclesUseCase } from './useCases/getAllMotorcycles'
import { returnMotorcycleUseCase } from './useCases/returnMotorcycle'
import chalk from 'chalk'
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
        if (err) console.log(`${chalk.red('Error decoding token')}`)
        socket.decoded = decoded.id
        next()
      })
    } else {
      console.log(`${chalk.red('The token is not what was expected')}`)
      next(new Error('Authentication error'))
    }
  }
}).on('connection', async (socket: Socket| any) => {
  const motorcycles = await getAllMotorcyclesUseCase.execute()
  io.emit('motorcycles', motorcycles)

  socket.on('take:event', async (scheduleNumber: number) => {
    if (scheduleNumber && socket.decoded) {
      await takeMotorcycleUseCase.execute(socket.decoded, scheduleNumber)
        .then(async (response) => {
          if (response) {
            const motorcycles = await getAllMotorcyclesUseCase.execute()
            io.emit('motorcycles', motorcycles)
          } else {
            console.log(`${chalk.red('\n\nThe motorcycle could not be taken\n\n')}`)
          }
        })
        .catch(() => {
          console.log(`${chalk.red('\n\n Error \n\n')}`)
        })
    } else {
      console.log(`${chalk.white.bgRed('\n\n Invalid parameters \n\n')}`)
    }
  })

  socket.on('return:event', async (scheduleNumber: number) => {
    if (socket.decoded) {
      const res = await returnMotorcycleUseCase.execute(socket.decoded)
      if (res) {
        const motorcycles = await getAllMotorcyclesUseCase.execute()
        io.emit('motorcycles', motorcycles)
      }
    }
  })
})

httpServer.listen(3000, () => {
  console.log(`${chalk.bold.green('the server is running!..')}`)
})

export { httpServer }
