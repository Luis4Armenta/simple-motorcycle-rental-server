import { Router } from 'express'
import { createUserController } from './useCases/createUser'
import { loginUserController } from './useCases/loginUser'

const router = Router()

router.post('/register', (request, response): any => {
  return createUserController.handle(request, response)
})

router.post('/login', (request, response): any => {
  return loginUserController.handle(request, response)
})

export { router }
