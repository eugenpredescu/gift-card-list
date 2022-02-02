import { getValueAlreadyInGiftCard } from '../../resolvers/getValueAlreadyInGiftCard'
import { HTTP_ERROR_MESSAGES } from '../../utils/constants'
// eslint-disable-next-line jest/no-mocks-import
import {
  ctxInvalidEmail,
  ctxMasterdataValueTrue,
  ctxMasterdataWithoutValues,
  ctxMissingAuthentication,
  ctxMissingEmail,
  ctxMissingPermissions,
} from '../../__mocks__/contexts'

describe('Test getValueAlreadyInGiftCard', () => {
  it('should test if the return value is an error if I dont send an storeUserAuthToken', async () => {
    const returnValue = await getValueAlreadyInGiftCard(
      '',
      '',
      ctxMissingPermissions
    )

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.missingPermissions)
  })

  it('should test if the return value is an error if storeUserAuthToken dont have a VTEX authentication', async () => {
    const returnValue = await getValueAlreadyInGiftCard(
      '',
      '',
      ctxMissingAuthentication
    )

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.missingPermissions)
  })

  it('should test if the return value is an error if I dont send an email', async () => {
    const returnValue = await getValueAlreadyInGiftCard('', '', ctxMissingEmail)

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.missingEmail)
  })

  it('should test if the return value is an error if I send invalid an email', async () => {
    const returnValue = await getValueAlreadyInGiftCard('', '', ctxInvalidEmail)

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.invalidEmail)
  })

  it('should test if the return is a success if exist a gift card', async () => {
    const returnValue = await getValueAlreadyInGiftCard(
      '',
      '',
      ctxMasterdataValueTrue
    )

    expect(returnValue).toStrictEqual(3)
  })

  it('should test if the return is an error if dont exist a gift card', async () => {
    const returnValue = await getValueAlreadyInGiftCard(
      '',
      '',
      ctxMasterdataWithoutValues
    )

    expect(returnValue).toStrictEqual(0)
  })
})
