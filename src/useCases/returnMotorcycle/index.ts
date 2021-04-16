import { BcryptEncryptor } from '../../providers/implementations/BcryptEncryptor'
import { JsonWebToken } from '../../providers/implementations/JsonWebToken'
import { IMotorcycleRepository } from '../../repositories/IMotorcycleRepository'
import { MongodbMotorcycleRepository } from '../../repositories/implementations/MongodbMotorcycleRepository'
import { MongodbUserRepository } from '../../repositories/implementations/MongodbUserRepository'
import { IUserRepository } from '../../repositories/IUserRepository'
import { ReturnMotorcycleUseCase } from './returnMotorcycle.useCase'
import { ReturnMotorcycleController } from './returnMotorcycleController'

const encryptor = new BcryptEncryptor()
const tokenService = new JsonWebToken()

const mongodbUserRepository: IUserRepository = new MongodbUserRepository(encryptor, tokenService)
const mongodbMotorcycleRepository: IMotorcycleRepository = new MongodbMotorcycleRepository()

export const returnMotorcycleUseCase = new ReturnMotorcycleUseCase(mongodbUserRepository, mongodbMotorcycleRepository)
const returnMotorcycleController = new ReturnMotorcycleController(returnMotorcycleUseCase)

export { returnMotorcycleController }
