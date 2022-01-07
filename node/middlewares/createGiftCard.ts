import { json } from 'co-body'

import { validateEmail } from '../utils/validateEmail'

export async function createGiftCard(ctx: Context) {
  const {
    clients: { profileSystem, giftCard, listGraphql },
  } = ctx

  const body = await json(ctx.req)

  if (!body.email) {
    ctx.body = { message: 'missed email' }
    ctx.status = 400

    return
  }

  if (!validateEmail(body.email)) {
    ctx.body = { message: 'email com formato inválido' }
    ctx.status = 400

    return
  }

  if (!body.idList) {
    ctx.body = { message: 'missed id list' }
    ctx.status = 400

    return
  }

  const listGraphqlValue: {
    name: string
    valuePurchased: string
  } = await listGraphql.checkDataValueList(body.idList)

  if (masterdataInfo.data[0] === undefined) {
    const register = await profileSystem.getRegisterOnProfileSystem(
      body.email,
      listGraphqlValue.name
    )

    const valueGiftCard: {
      id: string
      redemptionCode: string
    } = await giftCard.createGiftCard(register)

    result = await giftCard.addCreditInGiftCard(
      valueGiftCard.redemptionCode,
      valueGiftCard.id,
      parseInt(listGraphqlValue.valuePurchased, 10) / 100
    )

    const saveValues: SaveMasterdataValues = {
      listId: body.idList,
      giftCardId: valueGiftCard.id,
      email: body.email,
      profileId: register,
      redemptionCode: valueGiftCard.redemptionCode,
      quantityAlreadyInGiftCard:
        parseInt(listGraphqlValue.valuePurchased, 10) / 100,
    }

    await saveInfoMasterdata(ctx, saveValues)

    if (result) {
      ctx.body = {
        id: valueGiftCard.id,
        redemptionCode: valueGiftCard.redemptionCode,
      }
    } else {
      ctx.body = 'failed'
    }
  }
}
