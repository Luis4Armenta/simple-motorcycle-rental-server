import { IEncryptor } from '../../providers/IEncryptor'
import { BcryptEncryptor } from '../../providers/implementations/BcryptEncryptor'
import { JsonWebToken } from '../../providers/implementations/JsonWebToken'
import { IWebToken } from '../../providers/IWebToken'
import { MongodbUserRepository } from '../../repositories/implementations/MongodbUserRepository'
import { IUserRepository } from '../../repositories/IUserRepository'
import { HasMotorcycleUseCase } from './hasMotocycle.useCase'
import { HasMotorcycleController } from './hasMotocycleController'

const bcrypt: IEncryptor = new BcryptEncryptor()
const jwt: IWebToken = new JsonWebToken()

const mongodbUserRepository: IUserRepository = new MongodbUserRepository(bcrypt, jwt)

const hasMotorcycleUseCase = new HasMotorcycleUseCase(mongodbUserRepository)
const hasMotorcycleController = new HasMotorcycleController(hasMotorcycleUseCase)

export { hasMotorcycleController }
