export interface IMotorcycleRepository {
  getAllMotorcycles: () => Promise<any>
  getQuantityMotorcycles: (scheduleNumber: number) => Promise<number>
  getAvailableMotorcycles: (scheduleNumber: number) => Promise<number>
}
