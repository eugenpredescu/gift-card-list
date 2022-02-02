import { HTTP_ERROR_MESSAGES } from '../../utils/constants'
import { verifyEmail } from '../../utils/verifyEmail'
// eslint-disable-next-line jest/no-mocks-import
import {
  ctx,
  ctxInvalidEmail,
  ctxMissingAuthentication,
  ctxMissingEmail,
  ctxMissingPermissions,
} from '../../__mocks__/contexts'

describe('Test verifyEmail', () => {
  it('should test if the return value is an error if I dont send an storeUserAuthToken', async () => {
    const returnValue = await verifyEmail(ctxMissingPermissions)

    expect(returnValue).toStrictEqual({
      email: '',
      error: HTTP_ERROR_MESSAGES.missingPermissions,
    })
  })

  it('should test if the return value is an error if storeUserAuthToken dont have a VTEX authentication', async () => {
    const returnValue = await verifyEmail(ctxMissingAuthentication)

    expect(returnValue).toStrictEqual({
      email: '',
      error: HTTP_ERROR_MESSAGES.missingPermissions,
    })
  })

  it('should test if the return value is an error if I dont send an email', async () => {
    const returnValue = await verifyEmail(ctxMissingEmail)

    expect(returnValue).toStrictEqual({
      email: '',
      error: HTTP_ERROR_MESSAGES.missingEmail,
    })
  })

  it('should test if the return value is an error if I send invalid an email', async () => {
    const returnValue = await verifyEmail(ctxInvalidEmail)

    expect(returnValue).toStrictEqual({
      email: '',
      error: HTTP_ERROR_MESSAGES.invalidEmail,
    })
  })

  it('should test if the return value is an email if I send email valid storeUserAuthToken', async () => {
    const returnValue = await verifyEmail(ctx)

    expect(returnValue).toStrictEqual({ email: 'test@test.com', error: '' })
  })
})
