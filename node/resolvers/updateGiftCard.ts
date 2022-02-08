import { HTTP_ERROR_MESSAGES } from '../utils/constants'
import {
  getInfoMasterdata,
  saveInfoMasterdata,
  updateInfoMasterdata,
} from '../utils/listMasterdata'
import { verifyEmail } from '../utils/verifyEmail'

export async function updateGiftCard(
  _: unknown,
  valueAddGiftCrad: { value: number },
  ctx: Context
) {
  const { value } = valueAddGiftCrad
  const {
    clients: { profileSystem, giftCard, listGraphql },
  } = ctx

  if (!value) {
    return HTTP_ERROR_MESSAGES.missingValue
  }

  if (value <= 0) {
    return HTTP_ERROR_MESSAGES.negativeValue
  }

  const verify = await verifyEmail(ctx)

  if (verify.email === '') return verify.error

  const { email } = verify

  const listGraphqlValue: {
    name: string
    valuePurchased: number
  } = await listGraphql.checkDataValueList(verify.email)

  if (value > listGraphqlValue.valuePurchased) {
    return (
      HTTP_ERROR_MESSAGES.valueBiggerThanCouldBe +
      listGraphqlValue.valuePurchased.toString()
    )
  }

  const masterdataInfo = (await getInfoMasterdata(ctx, email)).data[0]

  let result = false

  if (masterdataInfo === undefined) {
    const register = await profileSystem.getRegisterOnProfileSystem(
      email,
      listGraphqlValue.name
    )

    const valueGiftCard: {
      id: string
      redemptionCode: string
    } = await giftCard.createGiftCard(register)

    result = await giftCard.addCreditInGiftCard(
      valueGiftCard.redemptionCode,
      valueGiftCard.id,
      value
    )

    const saveValues: SaveMasterdataValues = {
      giftCardId: valueGiftCard.id,
      email,
      profileId: register,
      redemptionCode: valueGiftCard.redemptionCode,
      quantityAlreadyInGiftCard: value,
      history: [
        {
          dateAndTime: new Date().toISOString(),
          value,
        },
      ],
    }

    await saveInfoMasterdata(ctx, saveValues)

    if (result) {
      return HTTP_ERROR_MESSAGES.success
    }

    return HTTP_ERROR_MESSAGES.failed
  }

  result = await giftCard.addCreditInGiftCard(
    masterdataInfo.redemptionCode as string,
    masterdataInfo.giftCardId as string,
    value as number
  )

  await updateInfoMasterdata(
    ctx,
    masterdataInfo.id as string,
    (masterdataInfo.quantityAlreadyInGiftCard as number) + (value as number),
    masterdataInfo.history as HistoryInterface[],
    value as number
  )

  if (result) {
    return HTTP_ERROR_MESSAGES.success
  }

  return HTTP_ERROR_MESSAGES.failed
}
