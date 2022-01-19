import { randomString } from '../../utils/ramdomString'

describe('Test validateEmail', () => {
  it('Test if return a valid string', async () => {
    const returnValue = randomString()

    expect(returnValue).toHaveLength(5)
    expect(typeof returnValue).toBe('string')
  })
})
