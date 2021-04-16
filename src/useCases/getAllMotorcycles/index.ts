import { IMotorcycleRepository } from '../../repositories/IMotorcycleRepository'
import { MongodbMotorcycleRepository } from '../../repositories/implementations/MongodbMotorcycleRepository'
import { GetAllMotorcyclesUseCase } from './getAllMotorcycles.useCase'
import { GetAllMotorcyclesController } from './getAllMotorcyclesController'

const mongoMotorcycleRepository: IMotorcycleRepository = new MongodbMotorcycleRepository()

export const getAllMotorcyclesUseCase = new GetAllMotorcyclesUseCase(mongoMotorcycleRepository)
const getAllMotorcyclesController = new GetAllMotorcyclesController(getAllMotorcyclesUseCase)

export { getAllMotorcyclesController }
