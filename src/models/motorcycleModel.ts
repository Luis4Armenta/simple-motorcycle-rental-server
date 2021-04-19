import { Schema, model, Model } from 'mongoose'
import { IMotorcycle } from '../interfaces/IMotorcycle'

const motorcycleSchema = new Schema({
  scheduleNumber: { type: Number, max: 24, min: 0, unique: true },
  quantity: { type: Number, default: 8 },
  available: { type: Number, default: 8 }
})

const Motorcycle: Model<IMotorcycle> = model('Motorcycle', motorcycleSchema)

export { Motorcycle }
