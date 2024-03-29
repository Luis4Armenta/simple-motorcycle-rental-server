/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { IMotorcycleRepository } from '../IMotorcycleRepository'
import { Motorcycle } from '../../models/motorcycleModel'
import { IMotorcycle } from '../../interfaces/IMotorcycle'

export class MongodbMotorcycleRepository implements IMotorcycleRepository {
  async getAllMotorcycles (): Promise<IMotorcycle[]> {
    return await Motorcycle.find({})
      .then(motorcycles => motorcycles)
      .catch(() => [])
  }

  async getQuantityMotorcycles (scheduleNumber: number): Promise<number> {
    return await Motorcycle.findOne({ scheduleNumber: scheduleNumber })
      .then(motorcycle => {
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
      .then(motorcycle => {
        if (motorcycle != null) {
          return motorcycle.available
        } else {
          return -1
        }
      })
      .catch(() => -1)
  }

  async reduceAvailability (scheduleNumber: number): Promise<boolean> {
    if (await this.getAvailableMotorcycles(scheduleNumber) <= 0) {
      return false
    } else {
      return await Motorcycle.findOneAndUpdate({
        scheduleNumber: scheduleNumber
      }, { $inc: { available: -1 } })
        .then((res) => {
          if (res != null) {
            return true
          } else {
            return false
          }
        })
        .catch(() => {
          return false
        })
    }
  }

  async increaseAvailability (scheduleNumber: number): Promise<boolean> {
    if (await this.getAvailableMotorcycles(scheduleNumber) >= 8) {
      return false
    } else {
      return await Motorcycle.findOneAndUpdate({
        scheduleNumber: scheduleNumber
      }, { $inc: { available: 1 } })
        .then((res) => {
          if (res != null) {
            return true
          } else {
            return false
          }
        })
        .catch(() => false)
    }
  }
}
