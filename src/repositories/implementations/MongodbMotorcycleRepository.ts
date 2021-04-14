/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { IMotorcycleRepository } from '../IMotorcycleRepository'
import mongoose from 'mongoose'
import { Motorcycle } from '../../models/motorcycleModel'

export class MongodbMotorcycleRepository implements IMotorcycleRepository {
  constructor () {
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

  async getAllMotorcycles (): Promise<any> {
    return await Motorcycle.find({})
      .then(docs => docs)
      .catch(null)
  }

  async getQuantityMotorcycles (scheduleNumber: number): Promise<number> {
    return await Motorcycle.findOne({ scheduleNumber: scheduleNumber })
      .then((motorcycle: any) => {
        if (motorcycle != null) {
          return motorcycle.quantity
        } else {
          return -1
        }
      })
      .catch(() => -1)
  }

  async getAvailableMotorcycles (scheduleNumber: number): Promise<number> {
    return await Motorcycle.findOne({ scheduleNumber: scheduleNumber })
      .then((motorcycle: any) => {
        if (motorcycle != null) {
          return motorcycle.available
        } else {
          return -1
        }
      })
      .catch(() => -1)
  }
}
