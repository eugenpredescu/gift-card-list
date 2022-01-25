import { validateEmail } from '../../utils/validateEmail'

describe('Test validateEmail', () => {
  it('should test if return false if a send a invalid email', async () => {
    const returnValueWithoutSign = validateEmail('invalidEmail')
    const returnValueWithSign = validateEmail('invalidEmail@email')

    expect(returnValueWithoutSign).toBe(false)
    expect(returnValueWithSign).toBe(false)
  })
  it('should test if return true if a send a valid email', async () => {
    const returnValue = validateEmail('email@email.com')

    expect(returnValue).toBe(true)
  })
})
