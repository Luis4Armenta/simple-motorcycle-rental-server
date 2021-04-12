import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, required: 'username is required' },
  email: { type: String, required: true, unique: 'email already exists', index: true, match: [/. +@. +\.. + /, 'Please give a valid email address'] },
  password: { type: String, required: 'password is required' },
  hasMotorcycle: { type: Boolean, default: false }
})

const User = model('User', userSchema)
export { User }
