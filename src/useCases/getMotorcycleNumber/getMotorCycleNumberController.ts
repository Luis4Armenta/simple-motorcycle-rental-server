import { Request, Response } from 'express'
import { GetMotorCycleNumberUseCase } from './getMotorcycleNumber.useCase'

export class GetMotorcycleNumberController {
  constructor (private readonly getMotorcycleNumberUseCase: GetMotorCycleNumberUseCase) { }

  async handle (request: Request | any, response: Response): Promise<Response> {
    return await this.getMotorcycleNumberUseCase.execute(request.userId)
      .then((motorcycleNumber) => response.status(200).json({
        motorcycleNumber: motorcycleNumber
      }))
      .catch(() => response.status(200).json({
        motorcycleNumber: 0
      }))
  }
}
