/* eslint-disable @typescript-eslint/no-floating-promises */
import { IUserRepository } from '../IUserRepository'
import mongoose from 'mongoose'
import { User } from '../../models/userModel'
import { IEncryptor } from '../../providers/IEncryptor'
import { IWebToken } from '../../providers/IWebToken'
import { ICreateUserRequestDTO } from '../../useCases/createUser/createUserDTO'

export class MongodbUserRepository implements IUserRepository {
  constructor (private readonly encryptor: IEncryptor, private readonly webTokenFactory: IWebToken) {
    this.connect()
  }

  private async connect (): Promise<void> {
    mongoose.connect('mongodb://localhost/motorcycles', { useNewUrlParser: true, useUnifiedTopology: true })
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
      console.log('conexion abierta')
    })
  }

  async register (data: ICreateUserRequestDTO): Promise<boolean> {
    const newUser = new User({ name: data.name, email: data.email, password: this.encryptor.encrypt(data.password) })
    console.log(newUser, 'new user')
    return await newUser.save().then(() => true).catch(() => false)
  }

  async login (email: string, password: string): Promise<any> {
    return await User.findOne({ email: email }).then((user: any) => {
      if (this.encryptor.compare(password, user.password)) {
        return {
          user: user.name,
          acesstoken: this.webTokenFactory.sign(user._id)
        }
      } else {
        return {
          user: '',
          acesstoken: ''
        }
      }
    })
      .catch(() => {
        return { user: '', accessToken: '' }
      })
  }

  async hasMotorcycle (token: string): Promise<boolean> {
    const payload: any = this.webTokenFactory.verify(token)
    const id = payload.id
    return await User.findById(id)
      .then((user: any) => {
        return user.hasMotorcycle
      }).catch(() => false)
  }
}
