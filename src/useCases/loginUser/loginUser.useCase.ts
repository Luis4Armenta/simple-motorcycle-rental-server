import { IEncryptor } from '../../providers/IEncryptor'
import { IWebToken } from '../../providers/IWebToken'
import { IUserRepository } from '../../repositories/IUserRepository'

export class LoginUserUseCase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly encrptor: IEncryptor,
    private readonly weToker: IWebToken
  ) { }

  async execute (email: string, password: string): Promise<any> {
    return await this.userRepository.login(email).then(user => {
      if (user != null) {
        if (this.encrptor.compare(password, user.password)) {
          return {
            name: user.name,
            accessToken: this.weToker.sign(user._id)
          }
        } else {
          return {
            name: '',
            accessToken: ''
          }
        }
      } else {
        return {
          name: '',
          accessToken: ''
        }
      }
    })
  }
}
