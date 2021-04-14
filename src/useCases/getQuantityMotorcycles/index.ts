import { IMotorcycleRepository } from '../../repositories/IMotorcycleRepository'
import { MongodbMotorcycleRepository } from '../../repositories/implementations/MongodbMotorcycleRepository'
import { GetQuantityMotorcycleUseCase } from './getQuantityMotorcycles.useCase'
import { GetQuantityMotorcycleController } from './getQuantityMotorcyclesController'

const mongoMotorcycleRepository: IMotorcycleRepository = new MongodbMotorcycleRepository()

const getQuantityMotorcycleUseCase = new GetQuantityMotorcycleUseCase(mongoMotorcycleRepository)
const getQuantityMotorcycleController = new GetQuantityMotorcycleController(getQuantityMotorcycleUseCase)

export { getQuantityMotorcycleController }
