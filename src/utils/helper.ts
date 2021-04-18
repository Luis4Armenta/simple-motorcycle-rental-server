function getToken (authorizationHeader: string): string {
  const words = authorizationHeader.split(' ')
  if (words.length === 2) {
    return words[1]
  } else {
    return ''
  }
}

export default getToken
