import { ICreateUserRequestDTO } from '../useCases/createUser/createUserDTO'
import { AccessDataDTO } from '../useCases/loginUser/accessDataDTO'

export interface IUserRepository {
  login: (email: string, password: string) => Promise<AccessDataDTO>
  register: (data: ICreateUserRequestDTO) => Promise<boolean>
  hasMotorcycle: (token: string) => Promise<boolean>
  getMotorcycleNumber: (token: string) => Promise<number>
}
