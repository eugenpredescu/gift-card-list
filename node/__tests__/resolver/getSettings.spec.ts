/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getSettings } from '../../resolvers/getSettings'

describe('Test getSettings', () => {
  it('should test if function getAppSettings have a value return', async () => {
    // @ts-ignore
    const ctx = {
      vtex: {
        userAgent: 'agent',
      },
      clients: {
        apps: {
          getAppSettings: jest
            .fn()
            .mockResolvedValue({ settingsAccount: 'account' }),
        },
      },
    } as Context

    const returnValue = await getSettings('', '', ctx)

    expect(returnValue).toStrictEqual({ settingsAccount: 'account' })
  })
})
