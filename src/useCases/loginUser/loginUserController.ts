import { Request, Response } from 'express'
import { LoginUserUseCase } from './loginUser.useCase'
import { ILoginUserRequestDTO } from './loginUserDTO'

export class LoginUserController {
  constructor (private readonly loginUserUSeCase: LoginUserUseCase) { }

  async handle (request: Request, response: Response): Promise<Response> {
    const data: ILoginUserRequestDTO = { email: request.body.email, password: request.body.password }
    return await this.loginUserUSeCase.execute(data.email, data.password)
      .then((token) => response.status(200).json(token))
      .catch((token) => response.status(403).json(token))
  }
}
