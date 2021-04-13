import { Request, Response } from 'express'
import getToken from '../../utils/helper'
import { ReturnMotorcycleUseCase } from './returnMotorcycle.useCase'

export class ReturnMotorcycleController {
  constructor (private readonly returnMotorcycleUseCase: ReturnMotorcycleUseCase) { }

  async handle (request: Request, response: Response): Promise<Response> {
    const header = request.headers.authorization
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (header) {
      return await this.returnMotorcycleUseCase.execute(getToken(header))
        .then((status) => response.send(status))
        .catch(() => response.send(false))
    } else {
      return response.send(false)
    }
  }
}
