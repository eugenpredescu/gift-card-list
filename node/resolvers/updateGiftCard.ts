import { HTTP_ERROR_MESSAGES } from '../utils/constants'
import { getAdminEmail } from '../utils/getAdminEmail'
import {
  getInfoMasterdata,
  saveInfoMasterdata,
  updateInfoMasterdata,
} from '../utils/listMasterdata'
import { validateEmail } from '../utils/validateEmail'

export async function updateGiftCard(
  _: unknown,
  valueAddGiftCrad: { value: number },
  ctx: Context
) {
  const { value } = valueAddGiftCrad
  const {
    clients: { profileSystem, giftCard, listGraphql, vtexid },
    vtex: { storeUserAuthToken },
  } = ctx

  if (!storeUserAuthToken) {
    return HTTP_ERROR_MESSAGES.missingPermitions
  }

  let authenticatedUser

  if (storeUserAuthToken) {
    authenticatedUser = await vtexid.getAuthenticatedUser(storeUserAuthToken)
  }

  if (!authenticatedUser) {
    return HTTP_ERROR_MESSAGES.missingPermitions
  }

  const email = getAdminEmail(storeUserAuthToken)

  if (!email) {
    return HTTP_ERROR_MESSAGES.missingEmail
  }

  if (!validateEmail(email)) {
    return HTTP_ERROR_MESSAGES.invalidEmail
  }

  if (!value) {
    return HTTP_ERROR_MESSAGES.missingValue
  }

  if (value <= 0) {
    return HTTP_ERROR_MESSAGES.negativeValue
  }

  const listGraphqlValue: {
    name: string
    valuePurchased: number
  } = await listGraphql.checkDataValueList(email)

  if (value > listGraphqlValue.valuePurchased) {
    return (
      HTTP_ERROR_MESSAGES.valueBiggerThanCouldBe +
      listGraphqlValue.valuePurchased.toString()
    )
  }

  const masterdataInfo = await getInfoMasterdata(ctx, email)

  let result = false

  if (masterdataInfo.data[0] === undefined) {
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
      return HTTP_ERROR_MESSAGES.sucess
    }

    return HTTP_ERROR_MESSAGES.failed
  }

  result = await giftCard.addCreditInGiftCard(
    masterdataInfo.data[0].redemptionCode as string,
    masterdataInfo.data[0].giftCardId as string,
    value as number
  )

  await updateInfoMasterdata(
    ctx,
    masterdataInfo.data[0].id as string,
    (masterdataInfo.data[0].quantityAlreadyInGiftCard as number) +
      (value as number),
    masterdataInfo.data[0].history as HistoryInterface[],
    value as number
  )

  if (result) {
    return HTTP_ERROR_MESSAGES.sucess
  }

  return HTTP_ERROR_MESSAGES.failed
}
