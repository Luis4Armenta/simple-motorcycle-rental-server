import getToken from '../../utils/helper'

describe('helper', () => {
  test('the result obtained must be equal to the second word of the header content', () => {
    const header = 'beader adoiasnd82nranfd83dfas1sa34adasada'
    expect(getToken(header)).toBe('adoiasnd82nranfd83dfas1sa34adasada')
  })

  test('If the header is empty it returns an empty string', () => {
    const header = ''
    expect(getToken(header)).toBe('')
  })

  test('if the number of words in the header is greater than 2, it returns an empty string', () => {
    const header = 'beader adoiasnd82nranfd83dfas1sa34adasada asdasdsa';
    expect(getToken(header)).toBe('')
  })
})
