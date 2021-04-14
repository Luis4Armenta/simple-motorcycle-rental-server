import { Request, Response } from 'express'
import { GetAvailableMotorcycleUseCase } from './getAvailableMotorcycles.useCase'

export class GetAvailableMotorcycleController {
  constructor (private readonly getAvailableMotorcycleUseCase: GetAvailableMotorcycleUseCase) { }

  async handle (request: Request, response: Response): Promise<Response> {
    return await this.getAvailableMotorcycleUseCase.execute(parseInt(request.body.scheduleNumber))
      .then(number => {
        if (number >= 0) {
          return response.status(200).json(number)
        } else {
          return response.status(402).send({ quantity: number })
        }
      })
      .catch(() => response.status(402).send({ quantity: -1 }))
  }
}
