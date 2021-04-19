import { MongodbUserRepository } from '../../repositories/implementations/MongodbUserRepository'
import { IUserRepository } from '../../repositories/IUserRepository'
import { HasMotorcycleUseCase } from './hasMotocycle.useCase'
import { HasMotorcycleController } from './hasMotocycleController'

const mongodbUserRepository: IUserRepository = new MongodbUserRepository()

const hasMotorcycleUseCase = new HasMotorcycleUseCase(mongodbUserRepository)
const hasMotorcycleController = new HasMotorcycleController(hasMotorcycleUseCase)

export { hasMotorcycleController }
