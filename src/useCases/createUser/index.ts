import { BcryptEncryptor } from '../../providers/implementations/BcryptEncryptor'
import { MongodbUserRepository } from '../../repositories/implementations/MongodbUserRepository'
import { CreateUserUseCase } from './createUser.useCase'
import { CreateUserController } from './createUserController'

const mongoDBUserRepository = new MongodbUserRepository()
const ecryptor = new BcryptEncryptor()

const createUserUseCase = new CreateUserUseCase(mongoDBUserRepository, ecryptor)
const createUserController = new CreateUserController(createUserUseCase)

export { createUserController }
