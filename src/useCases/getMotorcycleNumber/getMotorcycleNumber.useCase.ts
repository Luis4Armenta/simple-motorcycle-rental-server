import { IUserRepository } from '../../repositories/IUserRepository'

export class GetMotorCycleNumberUseCase {
  constructor (private readonly userRepository: IUserRepository) { }

  async execute (userId: string): Promise<number> {
    return await this.userRepository.getMotorcycleNumber(userId)
  }
}
