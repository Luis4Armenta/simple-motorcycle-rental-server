import { Request, Response } from 'express'
import { GetAllMotorcyclesUseCase } from './getAllMotorcycles.useCase'

export class GetAllMotorcyclesController {
  constructor (private readonly getAllMotorcyclesUseCase: GetAllMotorcyclesUseCase) { }

  async handle (request: Request, response: Response): Promise<Response> {
    return await this.getAllMotorcyclesUseCase.execute()
      .then(motorcycles => {
        return response.status(200).json(motorcycles)
      })
      .catch(() => response.status(200).send({}))
  }
}
