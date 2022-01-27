/* eslint-disable @typescript-eslint/ban-ts-comment */
import { updateSettings } from '../../resolvers/updateSettings'

describe('Test updateSettings', () => {
  it('should test if function updateSettings return the same value of getAppSettings', async () => {
    // @ts-ignore
    const ctx = {
      vtex: {
        userAgent: 'agent',
      },
      clients: {
        apps: {
          getAppSettings: jest
            .fn()
            .mockResolvedValue({ settingsAccount: 'account1' }),
          saveAppSettings: jest
            .fn()
            .mockResolvedValue({ settingsAccount: 'account2' }),
        },
        profileSystem: {
          disjoinProfileSystem: jest.fn(),
          joinProfileSystem: jest.fn(),
        },
      },
    } as Context

    const returnValue = await updateSettings(
      '',
      { settingsAccount: 'account1' },
      ctx
    )

    expect(returnValue).toStrictEqual({ settingsAccount: 'account1' })
  })

  it('should test if the function updateSettings return the same value of saveAppSettings', async () => {
    // @ts-ignore
    const ctx = {
      vtex: {
        userAgent: 'agent',
      },
      clients: {
        apps: {
          getAppSettings: jest
            .fn()
            .mockResolvedValue({ settingsAccount: 'account1' }),
          saveAppSettings: jest
            .fn()
            .mockResolvedValue({ settingsAccount: 'account2' }),
        },
        profileSystem: {
          disjoinProfileSystem: jest.fn(),
          joinProfileSystem: jest.fn(),
        },
      },
    } as Context

    const returnValue = await updateSettings(
      '',
      { settingsAccount: 'account2' },
      ctx
    )

    expect(returnValue).toStrictEqual({ settingsAccount: 'account2' })
  })
})
