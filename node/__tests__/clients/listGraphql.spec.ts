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
    // @ts-ignore
    const get = jest.spyOn(ListGraphqlClient.http, 'get').mockResolvedValue([
      { ownerName: 'name', valuePurchased: 1 },
      { ownerName: 'name', valuePurchased: 2 },
    ])

    const returnValue = await ListGraphqlClient.checkDataValueList(
      'email@email.com.br'
    )

    expect(returnValue).toStrictEqual({
      name: 'name',
      valuePurchased: 3,
    })

    return expect(get).toHaveBeenCalledWith(
      `https://${MOCKED_CONTEXT.account}.vtexcommercestable.com.br/api/dataentities/vtex_list_graphql_userLists/search?_schema=1.6.0&_fields=_all&ownerEmail=email@email.com.br`
    )
  })
})
