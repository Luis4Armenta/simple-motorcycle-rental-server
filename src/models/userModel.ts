import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hasMotorcycle: { type: Boolean, default: false }
})

const User = model('User', userSchema)
export { User }
