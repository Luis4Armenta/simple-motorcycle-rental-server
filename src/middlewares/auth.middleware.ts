import { Request, Response, NextFunction } from 'express'
import { JsonWebToken } from '../providers/implementations/JsonWebToken'
import getToken from '../utils/helper'

export function verifyToken (request: Request | any, response: Response, next: NextFunction): any {
  try {
    const header = request.headers.authorization
    console.log(header, 'header')
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!header) {
      console.log('no está el header')
      return response.status(401).send('deauthenticate request')
    }

    const token = getToken(header)
    console.log(token, 'token solo')
    if (token === null) {
      console.log('existe el header, pero no está el token en segunda posición')
      return response.status(401).send('deauthenticate request')
    }

    const payload: any = new JsonWebToken().verify(token)
    console.log(payload, 'contenido de payload')
    request.userId = payload.id
    return next()
  } catch (error) {
    console.log('hubo un error', error)
    return response.status(401).send('deauthenticate request')
  }
}
