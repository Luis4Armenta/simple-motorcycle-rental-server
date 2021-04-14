import { Router } from 'express'
import { verifyToken } from './middlewares/auth.middleware'
import { createUserController } from './useCases/createUser'
import { getAllMotorcyclesController } from './useCases/getAllMotorcycles'
import { getAvailableMotorcycleController } from './useCases/getAvailableMotorcycles'
import { getMotorycycleNumberController } from './useCases/getMotorcycleNumber'
import { getQuantityMotorcycleController } from './useCases/getQuantityMotorcycles'
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

router.get('/motorcycle/number', verifyToken, (request, response): any => {
  return getMotorycycleNumberController.handle(request, response)
})

router.get('/motorcycle/motorcycles', verifyToken, (request, response): any => {
  return getAllMotorcyclesController.handle(request, response)
})

router.get('/motorcycle/quantity', verifyToken, (request, response): any => {
  return getQuantityMotorcycleController.handle(request, response)
})

router.get('/motorcycle/available', verifyToken, (request, response): any => {
  return getAvailableMotorcycleController.handle(request, response)
})

export { router }
