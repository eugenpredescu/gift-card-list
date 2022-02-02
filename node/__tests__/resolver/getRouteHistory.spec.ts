import { getRouteHistory } from '../../resolvers/getRouteHistory'
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

describe('Test getRouteHistory', () => {
  it('should test if the return value is an error if I dont send an storeUserAuthToken', async () => {
    const returnValue = await getRouteHistory('', '', ctxMissingPermissions)

    expect(returnValue).toStrictEqual([
      { errorMessage: HTTP_ERROR_MESSAGES.missingPermissions },
    ])
  })

  it('should test if the return value is an error if storeUserAuthToken dont have a VTEX authentication', async () => {
    const returnValue = await getRouteHistory('', '', ctxMissingAuthentication)

    expect(returnValue).toStrictEqual([
      { errorMessage: HTTP_ERROR_MESSAGES.missingPermissions },
    ])
  })

  it('should test if the return value is an error if I dont send an email', async () => {
    const returnValue = await getRouteHistory('', '', ctxMissingEmail)

    expect(returnValue).toStrictEqual([
      { errorMessage: HTTP_ERROR_MESSAGES.missingEmail },
    ])
  })

  it('should test if the return value is an error if I send invalid an email', async () => {
    const returnValue = await getRouteHistory('', '', ctxInvalidEmail)

    expect(returnValue).toStrictEqual([
      { errorMessage: HTTP_ERROR_MESSAGES.invalidEmail },
    ])
  })

  it('should test if the return is a success if have a history', async () => {
    const returnValue = await getRouteHistory('', '', ctxRouteSuccess)

    expect(returnValue).toStrictEqual([
      {
        dateAndTime: '2022-01-07T19:37:16.2853567Z',
        value: 2,
      },
    ])
  })

  it('should test if the return is an error if dont have a history', async () => {
    const returnValue = await getRouteHistory('', '', ctxRouteError)

    expect(returnValue).toStrictEqual([
      { errorMessage: HTTP_ERROR_MESSAGES.failed },
    ])
  })
})
