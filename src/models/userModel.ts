import { Model, model, Schema } from 'mongoose'
import { IUser } from '../interfaces/IUser'

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  motorcycle: {
    hasMotorcycle: { type: Boolean, default: false },
    motorcycleNumber: { type: Number, default: 0, max: 24 }
  }
})

const User: Model<IUser> = model('User', userSchema)
export { User }
