import { IEncryptor } from '../../providers/IEncryptor'
import { BcryptEncryptor } from '../../providers/implementations/BcryptEncryptor'
import { JsonWebToken } from '../../providers/implementations/JsonWebToken'
import { IWebToken } from '../../providers/IWebToken'
import { MongodbUserRepository } from '../../repositories/implementations/MongodbUserRepository'
import { LoginUserUseCase } from './loginUser.useCase'
import { LoginUserController } from './loginUserController'

const bcrypt: IEncryptor = new BcryptEncryptor()
const jwt: IWebToken = new JsonWebToken()

const mongodbUserRepository = new MongodbUserRepository()

const loginUserUseCase = new LoginUserUseCase(mongodbUserRepository, bcrypt, jwt)
const loginUserController = new LoginUserController(loginUserUseCase)

export { loginUserController }
