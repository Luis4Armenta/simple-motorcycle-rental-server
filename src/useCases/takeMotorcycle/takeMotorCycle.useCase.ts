import { IMotorcycleRepository } from '../../repositories/IMotorcycleRepository'
import { IUserRepository } from '../../repositories/IUserRepository'

export class TakeMotorcycleUseCase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly motorcycleRepository: IMotorcycleRepository
  ) { }

  async execute (userId: string, scheduleNumber: number): Promise<boolean> {
    if (!await this.userRepository.hasMotorcycle(userId)) {
      if (await this.userRepository.takeMotorcycle(userId, scheduleNumber) && await this.motorcycleRepository.reduceAvailability(scheduleNumber)) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
}
