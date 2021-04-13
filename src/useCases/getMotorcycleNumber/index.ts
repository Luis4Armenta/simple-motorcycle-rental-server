import { IEncryptor } from '../../providers/IEncryptor'
import { BcryptEncryptor } from '../../providers/implementations/BcryptEncryptor'
import { JsonWebToken } from '../../providers/implementations/JsonWebToken'
import { IWebToken } from '../../providers/IWebToken'
import { MongodbUserRepository } from '../../repositories/implementations/MongodbUserRepository'
import { IUserRepository } from '../../repositories/IUserRepository'
import { GetMotorCycleNumberUseCase } from './getMotorcycleNumber.useCase'
import { GetMotorcycleNumberController } from './getMotorCycleNumberController'

const bcrypt: IEncryptor = new BcryptEncryptor()
const jwt: IWebToken = new JsonWebToken()

const mongodbUserRepository: IUserRepository = new MongodbUserRepository(bcrypt, jwt)

const getMotorycycleNumberUseCase = new GetMotorCycleNumberUseCase(mongodbUserRepository)
const getMotorycycleNumberController = new GetMotorcycleNumberController(getMotorycycleNumberUseCase)

export { getMotorycycleNumberController }
