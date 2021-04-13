import { ICreateUserRequestDTO } from '../useCases/createUser/createUserDTO'

export interface IUserRepository {
  login: (email: string, password: string) => Promise<any>
  register: (data: ICreateUserRequestDTO) => Promise<boolean>
  hasMotorcycle: (token: string) => Promise<boolean>
}
