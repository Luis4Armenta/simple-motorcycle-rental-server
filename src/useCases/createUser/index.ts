import { MongodbUserRepository } from '../../repositories/implementations/MongodbUserRepository'
import { CreateUserUseCase } from './createUser.useCase'
import { CreateUserController } from './createUserController'

const mongoDBUserRepository = new MongodbUserRepository()

const createUserUseCase = new CreateUserUseCase(mongoDBUserRepository)
const createUserController = new CreateUserController(createUserUseCase)

export { createUserController }
