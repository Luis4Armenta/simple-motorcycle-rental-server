import { IUser, User } from '../../../interfaces/IUser'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { ICreateUserRequestDTO } from '../../../useCases/createUser/createUserDTO'

class UserRepository implements IUserRepository {
  users: User[] = []

  async register (data: ICreateUserRequestDTO): Promise<boolean> {
    if (data.name !== '' && data.email !== '' && data.password !== '') {
      const fakeData: User = {
        _id: 'aasdad2asrwsd|drwesd3354',
        name: data.name,
        email: data.email,
        password: data.password,
        motorcycle: {
          hasMotorcycle: false,
          motorcycleNumber: 0
        }
      }
      this.users.push(fakeData)

      if (existsIn(this.users, fakeData)) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  async login (email: string): Promise<IUser | null> {
    if (email !== '') {
      this.users.forEach(user => {
        if (user.email === email) {
          return user
        } else {
          return null
        }
      })
      return null
    } else {
      return null
    }
  }

  async hasMotorcycle (userId: string): Promise<boolean> {
    if (userId !== '') {
      this.users.forEach(user => {
        if (user._id === userId) {
          return user.motorcycle.hasMotorcycle
        } else {
          return false
        }
      })
      return false
    } else {
      return false
    }
  }

  async getMotorcycleNumber (userId: string): Promise<number> {
    if (userId !== '') {
      if (await this.hasMotorcycle(userId)) {
        this.users.forEach(user => {
          if (user._id === userId) {
            return user.motorcycle.motorcycleNumber
          } else {
            return 0
          }
        })
        return 0
      } else {
        return 0
      }
    } else {
      return 0
    }
  }

  async takeMotorcycle (userId: string, motorcycleNumber: number): Promise<boolean> {
    if (userId !== '' && motorcycleNumber > 0) {
      if (!await this.hasMotorcycle(userId)) {
        this.users.forEach(user => {
          if (user._id === userId) {
            user.motorcycle.hasMotorcycle = true
            user.motorcycle.motorcycleNumber = motorcycleNumber
            return user.motorcycle.hasMotorcycle
          } else {
            return false
          }
        })
        return false
      } else {
        return false
      }
    } else {
      return false
    }
  }

  async returnMotorcycle (userId: string): Promise<boolean> {
    if (userId !== '') {
      if (await this.hasMotorcycle(userId)) {
        this.users.forEach(user => {
          if (user._id === userId) {
            user.motorcycle.hasMotorcycle = false
            user.motorcycle.motorcycleNumber = 0
            return !user.motorcycle.hasMotorcycle
          } else {
            return false
          }
        })
        return false
      } else {
        return false
      }
    } else {
      return false
    }
  }
}

function existsIn (array: User[], user: User): boolean {
  const res = array.filter((item: User) => {
    if (item._id === user._id) {
      return true
    } else {
      return false
    }
  })

  if (res.length > 0) {
    return true
  } else {
    return false
  }
}

const userRepository = new UserRepository()

export { userRepository }
