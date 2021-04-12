export interface IUserRepository {
  login: (email: string, password: string) => Promise<any>
  register: (name: string, email: string, password: string) => Promise<boolean>
  hasMotorcycle: (token: string) => Promise<boolean>
}
