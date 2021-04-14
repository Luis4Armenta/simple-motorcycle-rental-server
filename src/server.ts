/* eslint-disable @typescript-eslint/no-floating-promises */
import mongoose from 'mongoose'
import { app } from './app'

mongoose.connect('mongodb://localhost/motorcycles', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('open connection')
})

const server = app.listen(3000, () => {
  console.log('server running..')
})

export { server }
