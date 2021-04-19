import { Document } from 'mongoose'

export interface IUser extends Document, User {
  name: string
  email: string
  password: string
  motorcycle: {
    hasMotorcycle: boolean
    motorcycleNumber: number
  }
  _id: string
}

export interface User {
  name: string
  email: string
  password: string
  motorcycle: {
    hasMotorcycle: boolean
    motorcycleNumber: number
  }
  _id?: string
}
