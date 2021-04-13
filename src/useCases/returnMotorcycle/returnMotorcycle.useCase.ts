import { IUserRepository } from '../../repositories/IUserRepository'

export class ReturnMotorcycleUseCase {
  constructor (private readonly userRepository: IUserRepository) { }

  async execute (token: string): Promise<boolean> {
    return await this.userRepository.returnMotorcycle(token)
  }
}
