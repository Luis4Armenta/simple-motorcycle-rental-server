import { IMotorcycleRepository } from '../../repositories/IMotorcycleRepository'
import { MongodbMotorcycleRepository } from '../../repositories/implementations/MongodbMotorcycleRepository'
import { GetAvailableMotorcycleUseCase } from './getAvailableMotorcycles.useCase'
import { GetAvailableMotorcycleController } from './getAvailableMotorcyclesController'

const mongoMotorcycleRepository: IMotorcycleRepository = new MongodbMotorcycleRepository()

const getAvailableMotorcycleUseCase = new GetAvailableMotorcycleUseCase(mongoMotorcycleRepository)
const getAvailableMotorcycleController = new GetAvailableMotorcycleController(getAvailableMotorcycleUseCase)

export { getAvailableMotorcycleController }
