export interface IEncryptor {
  encrypt: (password: string, salt?: any) => string
  compare: (password1: string, password2: string) => boolean
}
