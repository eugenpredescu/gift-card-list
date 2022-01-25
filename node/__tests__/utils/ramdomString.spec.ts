import { randomString } from '../../utils/ramdomString'

describe('Test validateEmail', () => {
  it('should test if function randomString returns a valid string', async () => {
    const returnValue = randomString()

    expect(returnValue).toHaveLength(5)
    expect(typeof returnValue).toBe('string')
  })
})
