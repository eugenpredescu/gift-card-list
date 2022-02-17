/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ListGraphql } from '../../clients/listGraphql'

describe('List Graphql Client', () => {
  const MOCKED_CONTEXT = {
    workspace: 'master',
    account: 'sandboxbrdev',
    authToken: 'AUTH_TOKEN',
  } as any

  const MOCKED_OPTIONS = {} as any

  const ListGraphqlClient = new ListGraphql(MOCKED_CONTEXT, MOCKED_OPTIONS)

  it('should test if function checkDataValueList work right and have a valid return', async () => {
    const get = jest
      // @ts-ignore
      .spyOn(ListGraphqlClient.http, 'get')
      .mockResolvedValue({ name: 'name', valuePurchased: 3 })

    const returnValue = await ListGraphqlClient.checkDataValueList(
      'email@email.com.br'
    )

    expect(returnValue).toStrictEqual({
      name: 'name',
      valuePurchased: 3,
    })

    return expect(get).toHaveBeenCalledWith(
      `/_v/getDataList/email@email.com.br`
    )
  })
})
