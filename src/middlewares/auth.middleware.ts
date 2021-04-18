import { Request, Response, NextFunction } from 'express'
import { JsonWebToken } from '../providers/implementations/JsonWebToken'
import getToken from '../utils/helper'

export function verifyToken (request: Request | any, response: Response, next: NextFunction): any {
  try {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!request.headers || !request.headers.authorization) {
      response.statusCode = 401
      return response.send('deauthenticate request')
    }

    const header = request.headers.authorization

    const token = getToken(header)
    if (token === '') {
      response.statusCode = 401
      return response.send('deauthenticate request')
    }

    const payload: any = new JsonWebToken().verify(token)
    request.userId = payload.id
    return next()
  } catch (error) {
    response.statusCode = 401
    return response.send('deauthenticate request')
  }
}
