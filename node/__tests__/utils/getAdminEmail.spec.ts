/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getAdminEmail } from '../../utils/getAdminEmail'

describe('Test getAdminEmail', () => {
  it('Test if getAdminEmail have been called', async () => {
    const returnValue = getAdminEmail(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyMzQifQ.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiYWNjb3VudCI6InRlc3QiLCJhdWRpZW5jZSI6ImFkbWluIiwic2VzcyI6InNlc3MiLCJleHAiOiJleHAiLCJ1c2VySWQiOiJ1c2VySWQiLCJpYXQiOjEsImlzcyI6ImlzcyIsImp0aSI6Imp0aSJ9.nnqmVfGsobK5hfdtAu10a0NU36-kFQ0f2LmN4R9rs8Q'
    )

    expect(returnValue).toBe('test@test.com')
  })
})
