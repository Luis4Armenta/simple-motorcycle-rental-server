import { IMotorcycleRepository } from '../../repositories/IMotorcycleRepository'
import { IUserRepository } from '../../repositories/IUserRepository'

export class ReturnMotorcycleUseCase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly motorcycleRepository: IMotorcycleRepository
  ) { }

  async execute (userId: string): Promise<boolean> {
    if (await this.userRepository.hasMotorcycle(userId)) {
      return await this.userRepository.getMotorcycleNumber(userId)
        .then(async (scheduleNumber) => {
          if (scheduleNumber >= 24) {
            return false
          } else {
            if (await this.userRepository.returnMotorcycle(userId) && await this.motorcycleRepository.increaseAvailability(scheduleNumber)) {
              return true
            } else {
              return false
            }
          }
        })
        .catch(() => false)
    } else {
      return false
    }
  }
}
