import { CreateUserUseCase } from './createUser.useCase'
import { Request, Response } from 'express'

export class CreateUserController {
  constructor (
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body
    return await this.createUserUseCase.execute({ name, email, password })
      .then((success) => response.send(success))
      .catch(() => response.send(false))
  }
}
