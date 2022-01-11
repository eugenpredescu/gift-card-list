import { json } from 'co-body'

import {
  getInfoMasterdata,
  saveInfoMasterdata,
  updateInfoMasterdata,
} from '../utils/listMasterdata'
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

  const masterdataInfo = await getInfoMasterdata(ctx, body.email)

  let result = false

  const listGraphqlValue: {
    name: string
    valuePurchased: number
  } = await listGraphql.checkDataValueList(body.email)

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
      listGraphqlValue.valuePurchased / 100
    )

    const saveValues: SaveMasterdataValues = {
      giftCardId: valueGiftCard.id,
      email: body.email,
      profileId: register,
      redemptionCode: valueGiftCard.redemptionCode,
      quantityAlreadyInGiftCard: listGraphqlValue.valuePurchased / 100,
      history: [
        {
          dateAndTime: new Date().toISOString(),
          value: listGraphqlValue.valuePurchased / 100,
        },
      ],
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
  } else {
    const valueBefore = masterdataInfo.data[0]
      .quantityAlreadyInGiftCard as number

    const valueInList = listGraphqlValue.valuePurchased / 100

    if (valueInList - valueBefore !== 0) {
      result = await giftCard.addCreditInGiftCard(
        masterdataInfo.data[0].redemptionCode as string,
        masterdataInfo.data[0].giftCardId as string,
        (valueInList - valueBefore) as number
      )

      await updateInfoMasterdata(
        ctx,
        masterdataInfo.data[0].id as string,
        listGraphqlValue.valuePurchased / 100,
        masterdataInfo.data[0].history as HistoryInterface[],
        (valueInList - valueBefore) as number
      )
    } else {
      result = true
    }

    if (result) {
      ctx.body = {
        id: masterdataInfo.data[0].giftCardId,
        redemptionCode: masterdataInfo.data[0].redemptionCode,
      }
    } else {
      ctx.body = 'failed'
    }
  }
}
