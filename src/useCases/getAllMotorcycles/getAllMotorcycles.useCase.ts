import { IMotorcycleRepository } from '../../repositories/IMotorcycleRepository'

export class GetAllMotorcyclesUseCase {
  constructor (private readonly motorcycleRepository: IMotorcycleRepository) { }

  async execute (): Promise<any> {
    return await this.motorcycleRepository.getAllMotorcycles()
  }
}
