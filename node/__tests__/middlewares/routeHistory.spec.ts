import co_body from 'co-body'

import { routeHistory } from '../../middlewares/routeHistory'
import { ERROR, HTTP_ERROR_MESSAGES, SUCCESS } from '../../utils/constants'
// eslint-disable-next-line jest/no-mocks-import
import { ctx, ctxRouteError, ctxRouteSuccess } from '../../__mocks__/contexts'

describe('Test routeHistory', () => {
  it('testing if the return value is an error if I dont send an email', async () => {
    jest
      .spyOn(co_body, 'json')
      .mockImplementation()
      .mockResolvedValue({} as any)

    await routeHistory(ctx)

    const context = ctx.body as { message: string }

    expect(context.message).toBe(HTTP_ERROR_MESSAGES.missingEmail)
    expect(ctx.status).toBe(ERROR)
  })

  it('testing if the return value is an error if I send invalid an email', async () => {
    jest
      .spyOn(co_body, 'json')
      .mockImplementation()
      .mockResolvedValue({
        email: 'invalidEmail',
      } as any)

    await routeHistory(ctx)

    const context = ctx.body as { message: string }

    expect(context.message).toBe(HTTP_ERROR_MESSAGES.invalidEmail)
    expect(ctx.status).toBe(ERROR)
  })

  it('testing if the return is a success if have a history', async () => {
    jest
      .spyOn(co_body, 'json')
      .mockImplementation()
      .mockResolvedValue({
        email: 'email@email.com.br',
      } as any)

    await routeHistory(ctxRouteSuccess)

    expect(ctxRouteSuccess.body).toStrictEqual([
      {
        dateAndTime: '2022-01-07T19:37:16.2853567Z',
        value: 2,
      },
    ])
    expect(ctxRouteSuccess.status).toBe(SUCCESS)
  })

  it('testing if the return is an error if dont have a history', async () => {
    jest
      .spyOn(co_body, 'json')
      .mockImplementation()
      .mockResolvedValue({
        email: 'email@email.com.br',
      } as any)

    await routeHistory(ctxRouteError)

    expect(ctxRouteError.body).toStrictEqual(HTTP_ERROR_MESSAGES.failed)
    expect(ctxRouteError.status).toBe(ERROR)
  })
})
