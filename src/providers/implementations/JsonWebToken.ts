import { IWebToken } from '../IWebToken'
import jwt from 'jsonwebtoken'

export class JsonWebToken implements IWebToken {
  private readonly secretWord
  constructor () {
    this.secretWord = 'secretWord'
  }

  sign (identifier: string): string {
    return jwt.sign({ id: identifier }, this.secretWord)
  }

  verify (token: string): any {
    return jwt.verify(token, this.secretWord)
  }
}
