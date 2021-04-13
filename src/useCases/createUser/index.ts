import { BcryptEncryptor } from '../../providers/implementations/BcryptEncryptor'
import { JsonWebToken } from '../../providers/implementations/JsonWebToken'
import { MongodbUserRepository } from '../../repositories/implementations/MongodbUserRepository'
import { CreateUserUseCase } from './createUser.useCase'
import { CreateUserController } from './createUserController'

const bcrypt = new BcryptEncryptor()
const jwt = new JsonWebToken()
const mongoDBUserRepository = new MongodbUserRepository(bcrypt, jwt)

const createUserUseCase = new CreateUserUseCase(mongoDBUserRepository)
const createUserController = new CreateUserController(createUserUseCase)

export { createUserController }
