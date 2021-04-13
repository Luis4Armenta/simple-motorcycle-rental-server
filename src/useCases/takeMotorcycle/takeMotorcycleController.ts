import { Request, Response } from 'express'
import { TakeMotorcycleUseCase } from './takeMotorCycle.useCase'

export class TakeMotorcycleController {
  constructor (private readonly takeMotorcycleUseCase: TakeMotorcycleUseCase) { }
  async handle (request: Request | any, response: Response): Promise<Response> {
    return await this.takeMotorcycleUseCase.execute(request.userId, parseInt(request.body.motorcycleNumber))
      .then((status) => response.send(status))
      .catch(() => response.send(false))
  }
}
