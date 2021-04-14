import { IMotorcycleRepository } from '../../repositories/IMotorcycleRepository'

export class GetAvailableMotorcycleUseCase {
  constructor (private readonly motorcycleRepository: IMotorcycleRepository) { }

  async execute (scheduleNumber: number): Promise<number> {
    return await this.motorcycleRepository.getAvailableMotorcycles(scheduleNumber)
  }
}
