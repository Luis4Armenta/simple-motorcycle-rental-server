import { Request, Response } from 'express'
import getToken from '../../utils/helper'
import { TakeMotorcycleUseCase } from './takeMotorCycle.useCase'

export class TakeMotorcycleController {
  constructor (private readonly takeMotorcycleUseCase: TakeMotorcycleUseCase) { }
  async handle (request: Request, response: Response): Promise<Response> {
    const header = request.headers.authorization
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (header) {
      return await this.takeMotorcycleUseCase.execute(getToken(header), parseInt(request.body.motorcycleNumber))
        .then((status) => response.send(status))
        .catch(() => response.send(false))
    } else {
      return response.send(false)
    }
  }
}
