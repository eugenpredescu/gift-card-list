import { HTTP_ERROR_MESSAGES } from '../../utils/constants'
import { updateGiftCard } from '../../resolvers/updateGiftCard'
// eslint-disable-next-line jest/no-mocks-import
import {
  ctxInvalidEmail,
  ctxMissingEmail,
  ctx,
  ctxMasterdataUndefinedFalse,
  ctxMasterdataUndefinedTrue,
  ctxMasterdataValueFalse,
  ctxMasterdataValueTrue,
  ctxMissingPermitions,
  ctxMissingAuthentication,
} from '../../__mocks__/contexts'

describe('Test updateGiftCard', () => {
  it('should test if the return value is an error if I dont send an storeUserAuthToken', async () => {
    const returnValue = await updateGiftCard(
      '',
      { value: 20 },
      ctxMissingPermitions
    )

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.missingPermitions)
  })

  it('should test if the return value is an error if storeUserAuthToken dont have a VTEX authentication', async () => {
    const returnValue = await updateGiftCard(
      '',
      { value: 20 },
      ctxMissingAuthentication
    )

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.missingPermitions)
  })

  it('should test if the return value is an error if I dont send an email', async () => {
    const returnValue = await updateGiftCard('', { value: 20 }, ctxMissingEmail)

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.missingEmail)
  })

  it('should test if the return value is an error if I send invalid an email', async () => {
    const returnValue = await updateGiftCard('', { value: 20 }, ctxInvalidEmail)

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.invalidEmail)
  })

  it('should test if the return value is an error if I dont send a value', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const returnValue = await updateGiftCard('', '', ctx)

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.missingValue)
  })

  it('should test if the return value is an error if I send a value <= 0', async () => {
    const returnValue = await updateGiftCard('', { value: -2 }, ctx)

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.negativeValue)
  })

  it('should test if the return value is an error if I send a value > listGraphqlValue.valuePurchased', async () => {
    const returnValue = await updateGiftCard('', { value: 3 }, ctx)

    expect(returnValue).toStrictEqual(
      `${HTTP_ERROR_MESSAGES.valueBiggerThanCouldBe}2`
    )
  })

  it('should test if the return success when the function addCreditInGiftCard return true and dont have a giftcard before', async () => {
    const returnValue = await updateGiftCard(
      '',
      { value: 2 },
      ctxMasterdataUndefinedTrue
    )

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.sucess)
  })

  it('should test if the return error when the function addCreditInGiftCard return false and dont have a giftcard before', async () => {
    const returnValue = await updateGiftCard(
      '',
      { value: 2 },
      ctxMasterdataUndefinedFalse
    )

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.failed)
  })

  it('should test if the return success when the function addCreditInGiftCard return true and have a giftcard before', async () => {
    const returnValue = await updateGiftCard(
      '',
      { value: 2 },
      ctxMasterdataValueTrue
    )

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.sucess)
  })

  it('should test if the return error when the function addCreditInGiftCard return false and have a giftcard before', async () => {
    const returnValue = await updateGiftCard(
      '',
      { value: 2 },
      ctxMasterdataValueFalse
    )

    expect(returnValue).toStrictEqual(HTTP_ERROR_MESSAGES.failed)
  })
})
