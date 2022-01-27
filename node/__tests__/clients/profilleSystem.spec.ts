/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ProfileSystem } from '../../clients/profileSystem'

describe('List Graphql Client', () => {
  const MOCKED_CONTEXT = {
    workspace: 'master',
    account: 'sandboxbrdev',
    authToken: 'AUTH_TOKEN',
  } as any

  const MOCKED_OPTIONS = {} as any

  const ProfileSystemClient = new ProfileSystem(MOCKED_CONTEXT, MOCKED_OPTIONS)

  it('should test if function getRegisterOnProfileSystem works right and have a return without call function createRegisterOnProfileSystem', async () => {
    // @ts-ignore
    const get = jest.spyOn(ProfileSystemClient.http, 'get').mockResolvedValue({
      firstName: 'name',
      userId: 'id',
    })

    const returnValue = await ProfileSystemClient.getRegisterOnProfileSystem(
      'email@email.com.br',
      'name'
    )

    expect(returnValue).toBe('id')

    expect(get).toHaveBeenCalledWith(
      `https://${MOCKED_CONTEXT.account}.vtexcommercestable.com.br/api/profile-system/pvt/profiles/email@email.com.br/PersonalData?extraFields=_all`
    )
  })

  it('should test if function getRegisterOnProfileSystem works right and have a return with call function createRegisterOnProfileSystem', async () => {
    // @ts-ignore
    const get = jest.spyOn(ProfileSystemClient.http, 'get').mockResolvedValue({
      firstName: null,
    })

    const post = jest
      // @ts-ignore
      .spyOn(ProfileSystemClient.http, 'post')
      .mockResolvedValue({
        profileId: 'id',
      })

    const returnValue = await ProfileSystemClient.getRegisterOnProfileSystem(
      'email@email.com.br',
      'name'
    )

    expect(returnValue).toBe('id')

    expect(get).toHaveBeenCalledWith(
      `https://${MOCKED_CONTEXT.account}.vtexcommercestable.com.br/api/profile-system/pvt/profiles/email@email.com.br/PersonalData?extraFields=_all`
    )
    expect(post).toHaveBeenCalledWith(
      `https://${MOCKED_CONTEXT.account}.vtexcommercestable.com.br/api/profile-system/pvt/profiles/email@email.com.br/PersonalData?extraFields=_all`,
      {
        firstName: 'name',
      }
    )
  })

  it('should test if function joinProfileSystem works', async () => {
    const put = jest
      // @ts-ignore
      .spyOn(ProfileSystemClient.http, 'put')
      .mockResolvedValue('')

    await ProfileSystemClient.joinProfileSystem('account')

    expect(put).toHaveBeenCalledWith(
      `/api/profile-system/pvt/profilerepository?accountNameTo=account`
    )
  })

  it('should test if function disjoinProfileSystem works', async () => {
    const deleteFunction = jest
      // @ts-ignore
      .spyOn(ProfileSystemClient.http, 'delete')
      // @ts-ignore
      .mockResolvedValue('')

    await ProfileSystemClient.disjoinProfileSystem()

    expect(deleteFunction).toHaveBeenCalledWith(
      `/api/profile-system/pvt/profilerepository`
    )
  })
})
