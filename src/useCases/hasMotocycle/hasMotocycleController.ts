import { Request, Response } from 'express'
import { HasMotorcycleUseCase } from './hasMotocycle.useCase'

export class HasMotorcycleController {
  constructor (private readonly hasMotorcycleUseCase: HasMotorcycleUseCase) { }

  async handle (request: Request | any, response: Response): Promise<Response> {
    return await this.hasMotorcycleUseCase.execute(request.userId)
      .then((status) => response.status(200).send(status))
      .catch(() => response.status(200).send(false))
  }
}
