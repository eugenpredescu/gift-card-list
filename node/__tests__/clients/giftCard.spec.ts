/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GiftCard } from '../../clients/giftCard'

describe('Gift Card Client', () => {
  const MOCKED_CONTEXT = {
    workspace: 'master',
    account: 'sandboxbrdev',
    authToken: 'AUTH_TOKEN',
  } as any

  const MOCKED_OPTIONS = {} as any

  const GiftCardClient = new GiftCard(MOCKED_CONTEXT, MOCKED_OPTIONS)

  it('should test if function createGiftCard works right and have valid a return', async () => {
    // @ts-ignore
    const post = jest.spyOn(GiftCardClient.http, 'post').mockResolvedValue({
      id: 'id',
      redemptionCode: 'redemptionCode',
    })

    const returnValue = await GiftCardClient.createGiftCard('profileIdValue')

    expect(returnValue).toStrictEqual({
      id: 'id',
      redemptionCode: 'redemptionCode',
    })

    return expect(post).toHaveBeenCalledWith(
      `https://${MOCKED_CONTEXT.account}.vtexcommercestable.com.br/api/giftcards`,
      {
        expiringDate: '9999-12-31T23:59:59.997',
        multipleCredits: true,
        multipleRedemptions: true,
        profileId: 'profileIdValue',
        relationName: 'loyalty-program',
        restrictedToOwner: false,
      }
    )
  })

  it('should test if function addCreditInGiftCard works right and have a valid return', async () => {
    // @ts-ignore
    const post = jest.spyOn(GiftCardClient.http, 'post').mockResolvedValue({
      id: 'id',
    })

    const returnValue = await GiftCardClient.addCreditInGiftCard(
      'redemptionCodeValue',
      'id',
      1
    )

    expect(returnValue).toStrictEqual(true)
  })

  it('should test if function addCreditInGiftCard works right and have a invalid return', async () => {
    // @ts-ignore
    const post = jest.spyOn(GiftCardClient.http, 'post').mockResolvedValue({
      id: null,
    })

    const returnValue = await GiftCardClient.addCreditInGiftCard(
      'redemptionCodeValue',
      'id',
      1
    )

    expect(returnValue).toStrictEqual(false)
  })
})
