import { ICreateUserRequestDTO } from '../useCases/createUser/createUserDTO'
import { AccessDataDTO } from '../useCases/loginUser/accessDataDTO'

export interface IUserRepository {
  login: (email: string, password: string) => Promise<AccessDataDTO>
  register: (data: ICreateUserRequestDTO) => Promise<boolean>
  hasMotorcycle: (userId: string) => Promise<boolean>
  getMotorcycleNumber: (userId: string) => Promise<number>
  takeMotorcycle: (userId: string, motorcycleNumber: number) => Promise<boolean>
  returnMotorcycle: (userId: string) => Promise<boolean>
}
