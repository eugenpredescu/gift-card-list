/* eslint-disable @typescript-eslint/ban-ts-comment */
import VtexId from '../../clients/vtexid'

describe('Vtexid Client', () => {
  const MOCKED_CONTEXT = {
    workspace: 'master',
    account: 'sandboxbrdev',
    authToken: 'AUTH_TOKEN',
  } as any

  const MOCKED_OPTIONS = {} as any

  const VtexidClient = new VtexId(MOCKED_CONTEXT, MOCKED_OPTIONS)

  it('should test if the function getAuthenticatedUser works and have a return', async () => {
    // @ts-ignore
    // eslint-disable-next-line prettier/prettier
    const get = jest.spyOn(VtexidClient.http, 'get').mockResolvedValue({
      sub: 'test@test.com',
      account: 'test',
      audience: 'admin',
      sess: 'sess',
      exp: 'exp',
      userId: 'userId',
      iat: 1,
      iss: 'iss',
      jti: 'jti',
    })

    const returnValue = await VtexidClient.getAuthenticatedUser(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyMzQifQ.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiYWNjb3VudCI6InRlc3QiLCJhdWRpZW5jZSI6ImFkbWluIiwic2VzcyI6InNlc3MiLCJleHAiOiJleHAiLCJ1c2VySWQiOiJ1c2VySWQiLCJpYXQiOjEsImlzcyI6ImlzcyIsImp0aSI6Imp0aSJ9.nnqmVfGsobK5hfdtAu10a0NU36-kFQ0f2LmN4R9rs8Q'
    )

    expect(returnValue).toStrictEqual({
      sub: 'test@test.com',
      account: 'test',
      audience: 'admin',
      sess: 'sess',
      exp: 'exp',
      userId: 'userId',
      iat: 1,
      iss: 'iss',
      jti: 'jti',
    })

    return expect(get).toHaveBeenCalledWith(
      `/api/vtexid/pub/authenticated/user/`,
      {
        params: {
          authToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyMzQifQ.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiYWNjb3VudCI6InRlc3QiLCJhdWRpZW5jZSI6ImFkbWluIiwic2VzcyI6InNlc3MiLCJleHAiOiJleHAiLCJ1c2VySWQiOiJ1c2VySWQiLCJpYXQiOjEsImlzcyI6ImlzcyIsImp0aSI6Imp0aSJ9.nnqmVfGsobK5hfdtAu10a0NU36-kFQ0f2LmN4R9rs8Q',
        },
        metric: 'authenticated-user-get',
      }
    )
  })
})
