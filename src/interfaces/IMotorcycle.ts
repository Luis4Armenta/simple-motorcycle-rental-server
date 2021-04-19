import { Document } from 'mongoose'

export interface IMotorcycle extends Document {
  scheduleNumber: number
  quantity: number
  available: number
}
