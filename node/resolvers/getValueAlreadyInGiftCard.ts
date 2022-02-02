import { HTTP_ERROR_MESSAGES } from '../utils/constants'
import { getAdminEmail } from '../utils/getAdminEmail'
import { getInfoMasterdata } from '../utils/listMasterdata'
import { validateEmail } from '../utils/validateEmail'

export async function getValueAlreadyInGiftCard(
  _: unknown,
  __: unknown,
  ctx: Context
) {
  const {
    clients: { vtexid },
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

  const returnMasterdata = await getInfoMasterdata(ctx, email)

  const { quantityAlreadyInGiftCard } = returnMasterdata.data[0]

  return quantityAlreadyInGiftCard
}
