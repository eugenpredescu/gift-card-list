import { json } from 'co-body'

import { ERROR, HTTP_ERROR_MESSAGES, SUCCESS } from '../utils/constants'
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
    ctx.body = { message: HTTP_ERROR_MESSAGES.missingEmail }
    ctx.status = ERROR

    return
  }

  if (!validateEmail(body.email)) {
    ctx.body = { message: HTTP_ERROR_MESSAGES.invalidEmail }
    ctx.status = ERROR

    return
  }

  if (!body.value) {
    ctx.body = { message: HTTP_ERROR_MESSAGES.missingValue }
    ctx.status = ERROR

    return
  }

  if (body.value <= 0) {
    ctx.body = { message: HTTP_ERROR_MESSAGES.negativeValue }
    ctx.status = ERROR

    return
  }

  const listGraphqlValue: {
    name: string
    valuePurchased: number
  } = await listGraphql.checkDataValueList(body.email)

  if (body.value > listGraphqlValue.valuePurchased) {
    ctx.body = {
      message:
        HTTP_ERROR_MESSAGES.valueBiggerThanCouldBe +
        listGraphqlValue.valuePurchased.toString(),
    }
    ctx.status = ERROR

    return
  }

  const masterdataInfo = await getInfoMasterdata(ctx, body.email)

  let result = false

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
      body.value
    )

    const saveValues: SaveMasterdataValues = {
      giftCardId: valueGiftCard.id,
      email: body.email,
      profileId: register,
      redemptionCode: valueGiftCard.redemptionCode,
      quantityAlreadyInGiftCard: body.value,
      history: [
        {
          dateAndTime: new Date().toISOString(),
          value: body.value,
        },
      ],
    }

    await saveInfoMasterdata(ctx, saveValues)

    if (result) {
      ctx.body = {
        id: valueGiftCard.id,
        redemptionCode: valueGiftCard.redemptionCode,
      }
      ctx.status = SUCCESS
    } else {
      ctx.body = HTTP_ERROR_MESSAGES.failed
      ctx.status = ERROR
    }
  } else {
    result = await giftCard.addCreditInGiftCard(
      masterdataInfo.data[0].redemptionCode as string,
      masterdataInfo.data[0].giftCardId as string,
      body.value as number
    )

    await updateInfoMasterdata(
      ctx,
      masterdataInfo.data[0].id as string,
      (masterdataInfo.data[0].quantityAlreadyInGiftCard as number) +
        (body.value as number),
      masterdataInfo.data[0].history as HistoryInterface[],
      body.value as number
    )
  }

  if (result) {
    ctx.body = {
      id: masterdataInfo.data[0].giftCardId,
      redemptionCode: masterdataInfo.data[0].redemptionCode,
    }
    ctx.status = SUCCESS
  } else {
    ctx.body = HTTP_ERROR_MESSAGES.failed
    ctx.status = ERROR
  }
}
