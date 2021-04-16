import { IEncryptor } from '../../providers/IEncryptor'
import { BcryptEncryptor } from '../../providers/implementations/BcryptEncryptor'
import { JsonWebToken } from '../../providers/implementations/JsonWebToken'
import { IWebToken } from '../../providers/IWebToken'
import { IMotorcycleRepository } from '../../repositories/IMotorcycleRepository'
import { MongodbMotorcycleRepository } from '../../repositories/implementations/MongodbMotorcycleRepository'
import { MongodbUserRepository } from '../../repositories/implementations/MongodbUserRepository'
import { IUserRepository } from '../../repositories/IUserRepository'
import { TakeMotorcycleUseCase } from './takeMotorCycle.useCase'
import { TakeMotorcycleController } from './takeMotorcycleController'

const encryptor: IEncryptor = new BcryptEncryptor()
const tokenService: IWebToken = new JsonWebToken()

const mongodbUserRepository: IUserRepository = new MongodbUserRepository(encryptor, tokenService)
const mongodbMotorcycleRepository: IMotorcycleRepository = new MongodbMotorcycleRepository()

export const takeMotorcycleUseCase = new TakeMotorcycleUseCase(mongodbUserRepository, mongodbMotorcycleRepository)
const takeMotorcycleController = new TakeMotorcycleController(takeMotorcycleUseCase)

export { takeMotorcycleController }
