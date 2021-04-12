import { IWebToken } from '../IWebToken'
import jwt from 'jsonwebtoken'

export class JsonWebToken implements IWebToken {
  private readonly secretWord = 'secretWord'

  sign (identifier: string): string {
    return jwt.sign(identifier, this.secretWord)
  }

  verify (token: string): any {
    return jwt.verify(token, this.secretWord)
  }
}
