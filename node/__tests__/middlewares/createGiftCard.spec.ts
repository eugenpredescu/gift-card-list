import co_body from 'co-body'

import { ERROR, HTTP_ERROR_MESSAGES, SUCESS } from '../../utils/constants'
import { createGiftCard } from '../../middlewares/createGiftCard'
// eslint-disable-next-line jest/no-mocks-import
import {
  ctx,
  ctxMasterdataUndefinedFalse,
  ctxMasterdataUndefinedTrue,
  ctxMasterdataValueFalse,
  ctxMasterdataValueTrue,
} from '../../__mocks__/contexts'

describe('Test createGiftCrad', () => {
  it('testing if the return value is an error if I dont send an email', async () => {
    jest
      .spyOn(co_body, 'json')
      .mockImplementation()
      .mockResolvedValue({
        value: 1,
      } as any)

    await createGiftCard(ctx)

    expect(ctx.body.message).toBe(HTTP_ERROR_MESSAGES.missingEmail)
    expect(ctx.status).toBe(ERROR)
  })

  it('testing if the return value is an error if I send invalid an email', async () => {
    jest
      .spyOn(co_body, 'json')
      .mockImplementation()
      .mockResolvedValue({
        value: 1,
        email: 'invalidEmail',
      } as any)

    await createGiftCard(ctx)

    expect(ctx.body.message).toBe(HTTP_ERROR_MESSAGES.invalidEmail)
    expect(ctx.status).toBe(ERROR)
  })

  it('testing if the return value is an error if I dont send a value', async () => {
    jest
      .spyOn(co_body, 'json')
      .mockImplementation()
      .mockResolvedValue({
        email: 'email@email.com.br',
      } as any)

    await createGiftCard(ctx)

    expect(ctx.body.message).toBe(HTTP_ERROR_MESSAGES.missingValue)
    expect(ctx.status).toBe(ERROR)
  })

  it('testing if the return value is an error if I send a value <= 0', async () => {
    jest
      .spyOn(co_body, 'json')
      .mockImplementation()
      .mockResolvedValue({
        email: 'email@email.com.br',
        value: -2,
      } as any)

    await createGiftCard(ctx)

    expect(ctx.body.message).toBe(HTTP_ERROR_MESSAGES.negativeValue)
    expect(ctx.status).toBe(ERROR)
  })

  it('testing if the return value is an error if I send a value > listGraphqlValue.valuePurchased', async () => {
    jest
      .spyOn(co_body, 'json')
      .mockImplementation()
      .mockResolvedValue({
        email: 'email@email.com.br',
        value: 3,
      } as any)

    await createGiftCard(ctx)

    expect(ctx.body.message).toBe(
      `${HTTP_ERROR_MESSAGES.valueBiggerThanCouldBe}2`
    )
    expect(ctx.status).toBe(ERROR)
  })

  it('testing if the return success when the function addCreditInGiftCard return true and dont have a giftcard before', async () => {
    jest
      .spyOn(co_body, 'json')
      .mockImplementation()
      .mockResolvedValue({
        email: 'email@email.com.br',
        value: 3,
      } as any)

    await createGiftCard(ctxMasterdataUndefinedTrue)

    expect(ctxMasterdataUndefinedTrue.body).toStrictEqual({
      id: 'id',
      redemptionCode: 'redemptionCode',
    })
    expect(ctxMasterdataUndefinedTrue.status).toBe(SUCESS)
  })

  it('testing if the return error when the function addCreditInGiftCard return false and dont have a giftcard before', async () => {
    jest
      .spyOn(co_body, 'json')
      .mockImplementation()
      .mockResolvedValue({
        email: 'email@email.com.br',
        value: 3,
      } as any)

    await createGiftCard(ctxMasterdataUndefinedFalse)

    expect(ctxMasterdataUndefinedFalse.body).toStrictEqual(
      HTTP_ERROR_MESSAGES.failed
    )
    expect(ctxMasterdataUndefinedFalse.status).toBe(ERROR)
  })

  it('testing if the return success when the function addCreditInGiftCard return true and have a giftcard before', async () => {
    jest
      .spyOn(co_body, 'json')
      .mockImplementation()
      .mockResolvedValue({
        email: 'email@email.com.br',
        value: 3,
      } as any)

    await createGiftCard(ctxMasterdataValueTrue)

    expect(ctxMasterdataValueTrue.body).toStrictEqual({
      id: 'giftCardId',
      redemptionCode: 'redemptionCode',
    })
    expect(ctxMasterdataValueTrue.status).toBe(SUCESS)
  })

  it('testing if the return error when the function addCreditInGiftCard return false and have a giftcard before', async () => {
    jest
      .spyOn(co_body, 'json')
      .mockImplementation()
      .mockResolvedValue({
        email: 'email@email.com.br',
        value: 3,
      } as any)

    await createGiftCard(ctxMasterdataValueFalse)

    expect(ctxMasterdataValueFalse.body).toStrictEqual(
      HTTP_ERROR_MESSAGES.failed
    )
    expect(ctxMasterdataValueFalse.status).toBe(ERROR)
  })
})
