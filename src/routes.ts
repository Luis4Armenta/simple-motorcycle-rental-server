import { Router } from 'express'
import { createUserController } from './useCases/createUser'

const router = Router()

router.post('/register', (request, response): any => {
  return createUserController.handle(request, response)
})

export { router }
