import { IUserRepository } from '../../repositories/IUserRepository'
import { ICreateUserRequestDTO } from './createUserDTO'

export class CreateUserUseCase {
  constructor (
    private readonly userRepository: IUserRepository
  ) { }

  async execute (data: ICreateUserRequestDTO): Promise<boolean> {
    return await this.userRepository.register(data)
  }
}
