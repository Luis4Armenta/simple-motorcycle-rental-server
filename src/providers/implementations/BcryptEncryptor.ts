import bcrypt from 'bcryptjs'
import { IEncryptor } from '../IEncryptor'

export class BcryptEncryptor implements IEncryptor {
  encrypt (password: string, salt?: string): string {
    if (salt != null) {
      return bcrypt.hashSync(password, salt)
    } else {
      return bcrypt.hashSync(password)
    }
  }

  compare (comparing: string, comparator: string): boolean {
    return bcrypt.compareSync(comparing, comparator)
  }
}
