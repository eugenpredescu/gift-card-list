import { getRouteRedemptionCode } from '../../resolvers/getRouteRedemptionCode'
import { HTTP_ERROR_MESSAGES } from '../../utils/constants'
// eslint-disable-next-line jest/no-mocks-import
import {
  ctxInvalidEmail,
  ctxMissingAuthentication,
  ctxMissingEmail,
  ctxMissingPermissions,
  ctxRouteError,
  ctxRouteSuccess,
} from '../../__mocks__/contexts'

describe('Test getRouteRedemptionCode', () => {
  it('should test if the return value is an error if I dont send an storeUserAuthToken', async () => {
    const returnValue = await getRouteRedemptionCode(
      '',
      '',
      ctxMissingPermissions
    )

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.missingPermissions)
  })

  it('should test if the return value is an error if storeUserAuthToken dont have a VTEX authentication', async () => {
    const returnValue = await getRouteRedemptionCode(
      '',
      '',
      ctxMissingAuthentication
    )

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.missingPermissions)
  })

  it('should test if the return value is an error if I dont send an email', async () => {
    const returnValue = await getRouteRedemptionCode('', '', ctxMissingEmail)

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.missingEmail)
  })

  it('should test if the return value is an error if I send invalid an email', async () => {
    const returnValue = await getRouteRedemptionCode('', '', ctxInvalidEmail)

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.invalidEmail)
  })

  it('should test if the return is a success if have a redemptionCode', async () => {
    const returnValue = await getRouteRedemptionCode('', '', ctxRouteSuccess)

    expect(returnValue).toStrictEqual('redemptionCode')
  })

  it('should test if the return is an error if dont have a redemptionCode', async () => {
    const returnValue = await getRouteRedemptionCode('', '', ctxRouteError)

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.failed)
  })
})
