import { Request, Response } from 'express'
import { GetQuantityMotorcycleUseCase } from './getQuantityMotorcycles.useCase'

export class GetQuantityMotorcycleController {
  constructor (private readonly getQuantityMotorcycleUseCase: GetQuantityMotorcycleUseCase) { }

  async handle (request: Request, response: Response): Promise<Response> {
    return await this.getQuantityMotorcycleUseCase.execute(parseInt(request.body.scheduleNumber))
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
