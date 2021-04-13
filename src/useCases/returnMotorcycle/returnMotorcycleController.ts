import { Request, Response } from 'express'
import { ReturnMotorcycleUseCase } from './returnMotorcycle.useCase'

export class ReturnMotorcycleController {
  constructor (private readonly returnMotorcycleUseCase: ReturnMotorcycleUseCase) { }

  async handle (request: Request | any, response: Response): Promise<Response> {
    return await this.returnMotorcycleUseCase.execute(request.userId)
      .then((status) => response.send(status))
      .catch(() => response.send(false))
  }
}
