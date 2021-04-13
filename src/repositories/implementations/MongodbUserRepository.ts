/* eslint-disable @typescript-eslint/no-floating-promises */
import { IUserRepository } from '../IUserRepository'
import mongoose from 'mongoose'
import { User } from '../../models/userModel'
import { IEncryptor } from '../../providers/IEncryptor'
import { IWebToken } from '../../providers/IWebToken'
import { ICreateUserRequestDTO } from '../../useCases/createUser/createUserDTO'
import { AccessDataDTO } from '../../useCases/loginUser/accessDataDTO'

export class MongodbUserRepository implements IUserRepository {
  constructor (private readonly encryptor: IEncryptor, private readonly webTokenFactory: IWebToken) {
    this.connect()
  }

  private async connect (): Promise<void> {
    mongoose.connect('mongodb://localhost/motorcycles', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true })
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
      console.log('open connection')
    })
  }

  async register (data: ICreateUserRequestDTO): Promise<boolean> {
    const newUser = new User({ name: data.name, email: data.email, password: this.encryptor.encrypt(data.password) })
    if (await this.emailAlreadyExists(data.email)) {
      return false
    } else {
      return await newUser.save()
        .then(() => true)
        .catch(() => false)
    }
  }

  async login (email: string, password: string): Promise<AccessDataDTO> {
    return await User.findOne({ email: email }).then((user: any) => {
      if (this.encryptor.compare(password, user.password)) {
        return {
          user: user.name,
          accessToken: this.webTokenFactory.sign(user._id)
        }
      } else {
        return {
          user: '',
          accessToken: ''
        }
      }
    })
      .catch(() => {
        return { user: '', accessToken: '' }
      })
  }

  async hasMotorcycle (userId: string): Promise<boolean> {
    return await User.findById(userId)
      .then((user: any) => {
        return user.motorcycle.hasMotorcycle
      }).catch(() => false)
  }

  async getMotorcycleNumber (userId: string): Promise<number> {
    if (await this.hasMotorcycle(userId)) {
      return await User.findById(userId)
        .then((user: any) => {
          return user.motorcycle.motorcycleNumber
        })
        .catch(() => 0)
    } else {
      return 0
    }
  }

  async returnMotorcycle (userId: string): Promise<boolean> {
    return await User.findByIdAndUpdate(userId, { motorcycle: { motorcycleNumber: 0 } })
      .then(() => true)
      .catch(() => false)
  }

  async takeMotorcycle (userId: string, motorcycleNumber: number): Promise<boolean> {
    return await User.findByIdAndUpdate(userId, {
      motorcycle: {
        motorcycleNumber: motorcycleNumber,
        hasMotorcycle: true
      }
    })
      .then(user => {
        if (user != null) {
          return true
        } else {
          return false
        }
      })
      .catch(() => {
        return false
      })
  }

  private async emailAlreadyExists (email: string): Promise<boolean> {
    return await User.findOne({ email: email })
      .then(user => {
        if (user != null) {
          return true
        } else {
          return false
        }
      })
      .catch(() => false)
  }
}
