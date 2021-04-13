import { IUserRepository } from '../../repositories/IUserRepository'

export class HasMotorcycleUseCase {
  constructor (private readonly userRepository: IUserRepository) { }

  async execute (token: string): Promise<boolean> {
    return await this.userRepository.hasMotorcycle(token)
  }
}
