/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Vlm } from '../../clients/vlm'

describe('VLM Client', () => {
  const MOCKED_CONTEXT = {
    workspace: 'master',
    account: 'sandboxbrdev',
    authToken: 'AUTH_TOKEN',
  } as any

  const MOCKED_OPTIONS = {} as any

  const VlmClient = new Vlm(MOCKED_CONTEXT, MOCKED_OPTIONS)

  it('Test if getAccounts it works and have a return', async () => {
    // @ts-ignore
    // eslint-disable-next-line prettier/prettier
    const get = jest.spyOn(VlmClient.http, 'get').mockResolvedValue({
      sites: [{ name: 'account1' }, { name: 'account2' }],
    })

    const returnValue = await VlmClient.getAccounts()

    expect(returnValue).toStrictEqual(['account1', 'account2'])

    return expect(get).toHaveBeenCalledWith(`/api/vlm/account`)
  })
})
