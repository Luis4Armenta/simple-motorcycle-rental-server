import { IMotorcycleRepository } from '../../repositories/IMotorcycleRepository'
import { MongodbMotorcycleRepository } from '../../repositories/implementations/MongodbMotorcycleRepository'
import { MongodbUserRepository } from '../../repositories/implementations/MongodbUserRepository'
import { IUserRepository } from '../../repositories/IUserRepository'
import { TakeMotorcycleUseCase } from './takeMotorCycle.useCase'
import { TakeMotorcycleController } from './takeMotorcycleController'

const mongodbUserRepository: IUserRepository = new MongodbUserRepository()
const mongodbMotorcycleRepository: IMotorcycleRepository = new MongodbMotorcycleRepository()

export const takeMotorcycleUseCase = new TakeMotorcycleUseCase(mongodbUserRepository, mongodbMotorcycleRepository)
const takeMotorcycleController = new TakeMotorcycleController(takeMotorcycleUseCase)

export { takeMotorcycleController }
