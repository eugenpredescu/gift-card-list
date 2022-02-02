import { getValueTotalList } from '../../resolvers/getValueTotalList'
import { HTTP_ERROR_MESSAGES } from '../../utils/constants'
// eslint-disable-next-line jest/no-mocks-import
import {
  ctxInvalidEmail,
  ctxMasterdataValueTrue,
  ctxMissingAuthentication,
  ctxMissingEmail,
  ctxMissingPermissions,
} from '../../__mocks__/contexts'

describe('Test getValueTotalList', () => {
  it('should test if the return value is an error if I dont send an storeUserAuthToken', async () => {
    const returnValue = await getValueTotalList('', '', ctxMissingPermissions)

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.missingPermissions)
  })

  it('should test if the return value is an error if storeUserAuthToken dont have a VTEX authentication', async () => {
    const returnValue = await getValueTotalList(
      '',
      '',
      ctxMissingAuthentication
    )

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.missingPermissions)
  })

  it('should test if the return value is an error if I dont send an email', async () => {
    const returnValue = await getValueTotalList('', '', ctxMissingEmail)

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.missingEmail)
  })

  it('should test if the return value is an error if I send invalid an email', async () => {
    const returnValue = await getValueTotalList('', '', ctxInvalidEmail)

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.invalidEmail)
  })

  it('should test if the return is a success', async () => {
    const returnValue = await getValueTotalList('', '', ctxMasterdataValueTrue)

    expect(returnValue).toStrictEqual(5)
  })
})
