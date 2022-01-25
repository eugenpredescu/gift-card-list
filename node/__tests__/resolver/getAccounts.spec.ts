/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getAccounts } from '../../resolvers/getAccounts'

describe('Test getAccounts', () => {
  it('should test if the function getAccounts have a return', async () => {
    // @ts-ignore
    const ctx = {
      clients: {
        vlm: {
          getAccounts: jest.fn().mockResolvedValue(['account1', 'account2']),
        },
      },
    } as Context

    const returnValue = await getAccounts('', '', ctx)

    expect(returnValue).toStrictEqual(['account1', 'account2'])
  })
})
