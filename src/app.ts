/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { MongodbUserRepository } from './repositories/implementations/MongodbUserRepository'
import { BcryptEncryptor } from './providers/implementations/BcryptEncryptor'
import { JsonWebToken } from './providers/implementations/JsonWebToken'
import getToken from './utils/helper'
import { router } from './routes'

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use(router)

app.get('/', (req, res) => {
  res.status(200).send('ok')
})

app.get('/hasMotorcycle', async (req, res) => {
  const userRepository = await new MongodbUserRepository(new BcryptEncryptor(), new JsonWebToken())

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (req.headers.authorization) {
    return await userRepository.hasMotorcycle(getToken(req.headers.authorization))
      .then((status) => {
        res.send(status)
      })
      .catch(() => res.send(false))
  } else {
    return res.send(false)
  }
})

export { app }
