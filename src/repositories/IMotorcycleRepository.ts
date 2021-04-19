import { IMotorcycle } from '../interfaces/IMotorcycle'

export interface IMotorcycleRepository {
  getAllMotorcycles: () => Promise<IMotorcycle[]>
  getQuantityMotorcycles: (scheduleNumber: number) => Promise<number>
  getAvailableMotorcycles: (scheduleNumber: number) => Promise<number>
  reduceAvailability: (scheduleNumber: number) => Promise<boolean>
  increaseAvailability: (scheduleNumber: number) => Promise<boolean>
}
