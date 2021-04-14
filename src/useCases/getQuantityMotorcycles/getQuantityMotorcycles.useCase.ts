import { IMotorcycleRepository } from '../../repositories/IMotorcycleRepository'

export class GetQuantityMotorcycleUseCase {
  constructor (private readonly motorcycleRepository: IMotorcycleRepository) { }

  async execute (scheduleNumber: number): Promise<number> {
    return await this.motorcycleRepository.getQuantityMotorcycles(scheduleNumber)
  }
}
