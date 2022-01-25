import co_body from 'co-body'

import { routeRedemptionCode } from '../../middlewares/routeRedemptionCode'
import { ERROR, HTTP_ERROR_MESSAGES, SUCCESS } from '../../utils/constants'
// eslint-disable-next-line jest/no-mocks-import
import { ctx, ctxRouteError, ctxRouteSuccess } from '../../__mocks__/contexts'

describe('Test routeRedemptionCode', () => {
  it('should test if the return value is an error if I dont send an email', async () => {
    jest
      .spyOn(co_body, 'json')
      .mockImplementation()
      .mockResolvedValue({} as any)

    await routeRedemptionCode(ctx)

    const context = ctx.body as { message: string }

    expect(context.message).toBe(HTTP_ERROR_MESSAGES.missingEmail)
    expect(ctx.status).toBe(ERROR)
  })

  it('should test if the return value is an error if I send invalid an email', async () => {
    jest
      .spyOn(co_body, 'json')
      .mockImplementation()
      .mockResolvedValue({
        email: 'invalidEmail',
      } as any)

    await routeRedemptionCode(ctx)

    const context = ctx.body as { message: string }

    expect(context.message).toBe(HTTP_ERROR_MESSAGES.invalidEmail)
    expect(ctx.status).toBe(ERROR)
  })

  it('should test if the return is a success if have a redemptionCode', async () => {
    jest
      .spyOn(co_body, 'json')
      .mockImplementation()
      .mockResolvedValue({
        email: 'email@email.com.br',
      } as any)

    await routeRedemptionCode(ctxRouteSuccess)

    expect(ctxRouteSuccess.body).toStrictEqual('redemptionCode')
    expect(ctxRouteSuccess.status).toBe(SUCCESS)
  })

  it('should test if the return is an error if dont have a redemptionCode', async () => {
    jest
      .spyOn(co_body, 'json')
      .mockImplementation()
      .mockResolvedValue({
        email: 'email@email.com.br',
      } as any)

    await routeRedemptionCode(ctxRouteError)

    expect(ctxRouteError.body).toStrictEqual(HTTP_ERROR_MESSAGES.failed)
    expect(ctxRouteError.status).toBe(ERROR)
  })
})
