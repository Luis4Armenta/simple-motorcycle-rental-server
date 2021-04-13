import { IUserRepository } from '../../repositories/IUserRepository'

export class TakeMotorcycleUseCase {
  constructor (private readonly userRepository: IUserRepository) { }

  async execute (token: string, motorcycleNumber: number): Promise<boolean> {
    return await this.userRepository.takeMotorcycle(token, motorcycleNumber)
  }
}
