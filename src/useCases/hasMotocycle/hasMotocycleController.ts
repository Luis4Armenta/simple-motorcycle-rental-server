import { Request, Response } from 'express'
import getToken from '../../utils/helper'
import { HasMotorcycleUseCase } from './hasMotocycle.useCase'

export class HasMotorcycleController {
  constructor (private readonly hasMotorcycleUseCase: HasMotorcycleUseCase) { }

  async handle (request: Request, response: Response): Promise<Response> {
    const header = request.headers.authorization
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (header) {
      return await this.hasMotorcycleUseCase.execute(getToken(header))
        .then((status) => response.send(status))
        .catch(() => response.send(false))
    } else {
      return response.send(false)
    }
  }
}
