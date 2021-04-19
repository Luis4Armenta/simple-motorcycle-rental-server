import { IEncryptor } from '../../providers/IEncryptor'
import { IUserRepository } from '../../repositories/IUserRepository'
import { ICreateUserRequestDTO } from './createUserDTO'

export class CreateUserUseCase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly encryptor: IEncryptor
  ) { }

  async execute (data: ICreateUserRequestDTO): Promise<boolean> {
    data.password = this.encryptor.encrypt(data.password)
    return await this.userRepository.register(data)
  }
}
