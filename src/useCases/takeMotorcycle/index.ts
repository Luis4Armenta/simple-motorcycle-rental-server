import { IEncryptor } from '../../providers/IEncryptor'
import { BcryptEncryptor } from '../../providers/implementations/BcryptEncryptor'
import { JsonWebToken } from '../../providers/implementations/JsonWebToken'
import { IWebToken } from '../../providers/IWebToken'
import { MongodbUserRepository } from '../../repositories/implementations/MongodbUserRepository'
import { IUserRepository } from '../../repositories/IUserRepository'
import { TakeMotorcycleUseCase } from './takeMotorCycle.useCase'
import { TakeMotorcycleController } from './takeMotorcycleController'

const encryptor: IEncryptor = new BcryptEncryptor()
const tokenService: IWebToken = new JsonWebToken()

const mongodbUserRepository: IUserRepository = new MongodbUserRepository(encryptor, tokenService)

const takeMotorcycleUseCase = new TakeMotorcycleUseCase(mongodbUserRepository)
const takeMotorcycleController = new TakeMotorcycleController(takeMotorcycleUseCase)

export { takeMotorcycleController }
