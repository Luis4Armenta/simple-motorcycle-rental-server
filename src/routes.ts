import { Router } from 'express'
import { verifyToken } from './middlewares/auth.middleware'
import { createUserController } from './useCases/createUser'
import { hasMotorcycleController } from './useCases/hasMotocycle'
import { loginUserController } from './useCases/loginUser'
import { returnMotorcycleController } from './useCases/returnMotorcycle'
import { takeMotorcycleController } from './useCases/takeMotorcycle'

const router = Router()

router.post('/register', (request, response): any => {
  return createUserController.handle(request, response)
})

router.post('/login', (request, response): any => {
  return loginUserController.handle(request, response)
})

router.get('/motorcycle/hasmotorcycle', verifyToken, (request, response): any => {
  return hasMotorcycleController.handle(request, response)
})

router.get('/motorcycle/take', verifyToken, (request, response): any => {
  return takeMotorcycleController.handle(request, response)
})

router.get('/motorcycle/return', verifyToken, (request, response): any => {
  return returnMotorcycleController.handle(request, response)
})

export { router }
