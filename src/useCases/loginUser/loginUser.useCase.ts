import { IUserRepository } from '../../repositories/IUserRepository'
import { ILoginUserRequestDTO } from './loginUserDTO'

export class LoginUserUseCase {
  constructor (private readonly userRepository: IUserRepository) { }

  async execute (data: ILoginUserRequestDTO): Promise<any> {
    return await this.userRepository.login(data.email, data.password)
  }
}
