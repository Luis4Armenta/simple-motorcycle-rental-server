import bcrypt from 'bcryptjs'
import { IEncryptor } from '../IEncryptor'

export class BcryptEncryptor implements IEncryptor {
  encrypt (password: string): string {
    return bcrypt.hashSync(password)
  }

  compare (password1: string, password2: string): boolean {
    return bcrypt.compareSync(password1, password2)
  }
}
