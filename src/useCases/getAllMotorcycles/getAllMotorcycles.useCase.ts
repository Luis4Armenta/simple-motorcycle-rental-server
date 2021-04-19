import { IMotorcycle } from '../../interfaces/IMotorcycle'
import { IMotorcycleRepository } from '../../repositories/IMotorcycleRepository'

export class GetAllMotorcyclesUseCase {
  constructor (private readonly motorcycleRepository: IMotorcycleRepository) { }

  async execute (): Promise<IMotorcycle[]> {
    return await this.motorcycleRepository.getAllMotorcycles()
  }
}
