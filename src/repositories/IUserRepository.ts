import { IUser } from '../interfaces/IUser'
import { ICreateUserRequestDTO } from '../useCases/createUser/createUserDTO'

export interface IUserRepository {
  login: (email: string) => Promise<IUser | null>
  register: (data: ICreateUserRequestDTO) => Promise<boolean>
  hasMotorcycle: (userId: string) => Promise<boolean>
  getMotorcycleNumber: (userId: string) => Promise<number>
  takeMotorcycle: (userId: string, motorcycleNumber: number) => Promise<boolean>
  returnMotorcycle: (userId: string) => Promise<boolean>
}

// interface IUser {
//   name: string
//   email: string
//   password: string
//   motorcycle: {
//     hasMotorcycle: boolean
//     motorcycleNumber: number
//   }
// }
