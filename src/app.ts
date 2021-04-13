import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { router } from './routes'

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use(router)

app.get('/', (req, res) => {
  res.status(200).send('ok')
})

export { app }
