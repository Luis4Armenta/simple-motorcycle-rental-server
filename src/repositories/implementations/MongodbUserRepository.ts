/* eslint-disable @typescript-eslint/no-floating-promises */
import { IUserRepository } from '../IUserRepository'
import mongoose from 'mongoose'
import { User } from '../../models/userModel'
import { IEncryptor } from '../../providers/IEncryptor'
import { response } from 'express'
import { IWebToken } from '../../providers/IWebToken'

export class MongodbUserRepository implements IUserRepository {
  constructor (private readonly encryptor: IEncryptor, private readonly webTokenFactory: IWebToken) {
    this.connect()
  }

  private async connect (): Promise<Boolean> {
    return await mongoose.connect('mongodb//localhost:27017/motorcycles', { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => true).catch(() => false)
  }

  async register (name: string, email: string, password: string): Promise<boolean> {
    const newUser = new User({ name: name, email: email, password: this.encryptor.encrypt(password) })
    return await newUser.save().then(() => true).catch(() => false)
  }

  async login (email: string, password: string): Promise<any> {
    User.findOne({ email: email }, (err: any, user: any) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (err) {
        return response.status(404).json({
          mesage: 'username does not exist'
        })
      } else {
        if (this.encryptor.compare(password, user.password)) {
          return response.status(202).json({
            user: user.name,
            accessData: {
              token: this.webTokenFactory.sign(user._id)
            }
          })
        }
      }
    })
  }

  async hasMotorcycle (token: string): Promise<boolean> {
    const payload: any = this.webTokenFactory.verify(token)
    const id = payload.id
    return await User.findById(id).then((user: any) => {
      return user.hasMotorcycle as boolean
    }).catch(() => false)
  }
}
