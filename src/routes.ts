import { Router } from 'express'
import { createUserController } from './useCases/createUser'
import { hasMotorcycleController } from './useCases/hasMotocycle'
import { loginUserController } from './useCases/loginUser'

const router = Router()

router.post('/register', (request, response): any => {
  return createUserController.handle(request, response)
})

router.post('/login', (request, response): any => {
  return loginUserController.handle(request, response)
})

router.get('/hasmotorcycle', (request, response): any => {
  return hasMotorcycleController.handle(request, response)
})

export { router }
