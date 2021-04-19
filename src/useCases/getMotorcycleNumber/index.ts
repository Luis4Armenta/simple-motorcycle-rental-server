import { MongodbUserRepository } from '../../repositories/implementations/MongodbUserRepository'
import { IUserRepository } from '../../repositories/IUserRepository'
import { GetMotorCycleNumberUseCase } from './getMotorcycleNumber.useCase'
import { GetMotorcycleNumberController } from './getMotorCycleNumberController'

const mongodbUserRepository: IUserRepository = new MongodbUserRepository()

const getMotorycycleNumberUseCase = new GetMotorCycleNumberUseCase(mongodbUserRepository)
const getMotorycycleNumberController = new GetMotorcycleNumberController(getMotorycycleNumberUseCase)

export { getMotorycycleNumberController }
