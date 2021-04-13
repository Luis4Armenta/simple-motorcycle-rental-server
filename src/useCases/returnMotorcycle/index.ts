import { BcryptEncryptor } from '../../providers/implementations/BcryptEncryptor'
import { JsonWebToken } from '../../providers/implementations/JsonWebToken'
import { MongodbUserRepository } from '../../repositories/implementations/MongodbUserRepository'
import { ReturnMotorcycleUseCase } from './returnMotorcycle.useCase'
import { ReturnMotorcycleController } from './returnMotorcycleController'

const encryptor = new BcryptEncryptor()
const tokenService = new JsonWebToken()

const mongodbUserRepository = new MongodbUserRepository(encryptor, tokenService)

const returnMotorcycleUseCase = new ReturnMotorcycleUseCase(mongodbUserRepository)
const returnMotorcycleController = new ReturnMotorcycleController(returnMotorcycleUseCase)

export { returnMotorcycleController }
